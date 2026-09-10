import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import 'dotenv/config';
import express from 'express';
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const sessions = new Map<string, string>();
const sessionCookie = 'session';

const hashPassword = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(key);
    });
  });

const passwordMatches = async (password: string, storedHash: string) => {
  const [saltHex, hashHex] = storedHash.split(':');

  if (!saltHex || !hashHex) {
    return false;
  }

  const salt = Buffer.from(saltHex, 'hex');
  const expectedHash = Buffer.from(hashHex, 'hex');
  const actualHash = await hashPassword(password, salt);

  return expectedHash.length === actualHash.length && timingSafeEqual(expectedHash, actualHash);
};

app.use(express.json());

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  const demoEmail = process.env['AUTH_DEMO_EMAIL'];
  const demoPasswordHash = process.env['AUTH_DEMO_PASSWORD'];

  if (!demoEmail || !demoPasswordHash || !password || email !== demoEmail || !(await passwordMatches(password, demoPasswordHash))) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const sessionId = randomBytes(32).toString('hex');
  sessions.set(sessionId, email);
  res.cookie(sessionCookie, sessionId, { httpOnly: true, sameSite: 'lax' });
  res.json({ email, userName: email.split('@')[0] });
});

app.post('/api/auth/logout', (req, res) => {
  const sessionId = req.headers.cookie
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${sessionCookie}=`))
    ?.slice(sessionCookie.length + 1);

  if (sessionId) {
    sessions.delete(sessionId);
  }

  res.clearCookie(sessionCookie, { httpOnly: true, sameSite: 'lax' });
  res.sendStatus(204);
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

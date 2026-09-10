## Plan: Real Local Authentication

Replace the unconditional client mock with a minimal local Express authentication flow using an HttpOnly cookie, while keeping the current NgRx login UX and leaving routes public for this first pass.

**Steps**
1. Add a small Express API boundary in `src/server.ts` before static/Angular handling:
   - Parse JSON bodies.
   - `POST /api/auth/login` accepts `{ email, password }`, compares against `AUTH_DEMO_EMAIL` and `AUTH_DEMO_PASSWORD` environment variables, and returns `401` for invalid credentials.
   - On success, create a cryptographically random in-memory session id, set it in an HttpOnly `SameSite=Lax` cookie, and return the authenticated user shape (`email`, `userName`). Do not put credentials or the session id in the Angular state.
   - `POST /api/auth/logout` clears the cookie and removes the in-memory session.
   - Keep this explicitly development/demo-only: the in-memory session store resets on server restart and is not a production account system.
2. Replace `UserService.login()` in `src/app/services/user.service.ts` with `HttpClient.post` to the relative `/api/auth/login` endpoint using `withCredentials`, and add `logout()` calling `/api/auth/logout`. Reuse the existing `User` model or extend it only as needed; do not introduce a token service/interceptor because the browser-managed cookie handles auth.
3. Update `src/app/state/actions/user.action.ts`, `src/app/state/effects/user.effect.ts`, and `src/app/state/reducers/user.reducer.ts` so login success stores the returned user data, failures preserve a useful server error, and sign-out calls the service before clearing state. Keep the existing NgRx effect pattern and avoid adding route guards in this phase.
4. Update `src/app/components/login-form/login-form.ts` and its template to show an inline login error and avoid treating failed HTTP requests as success. Preserve the current template-driven form unless validation changes become necessary. Update navbar logout handling only where needed to invoke the real logout flow and navigate consistently.
5. Document environment variables, demo workflow, and the SSR server command in `README.md`. Since `ng serve` does not execute `src/server.ts`, verify using the existing build then `npm run serve:ssr:ng-test-app` flow on port 4000; keep normal Angular unit tests separate.

**Relevant files**
- `/home/hieu/projects/ng-21-learning/src/server.ts` — owns the new local API and cookie-backed in-memory sessions.
- `/home/hieu/projects/ng-21-learning/src/app/services/user.service.ts` — replace `of(true)` with HTTP calls.
- `/home/hieu/projects/ng-21-learning/src/app/state/actions/user.action.ts` — carry the authenticated user/error and model async sign-out.
- `/home/hieu/projects/ng-21-learning/src/app/state/effects/user.effect.ts` — map API responses and failures, and call logout.
- `/home/hieu/projects/ng-21-learning/src/app/state/reducers/user.reducer.ts` — store/clear user state and error state.
- `/home/hieu/projects/ng-21-learning/src/app/models/user.ts` — retain the minimal user contract, extending only if the endpoint needs a display name.
- `/home/hieu/projects/ng-21-learning/src/app/components/login-form/login-form.ts` and `login-form.html` — expose failure state to the user.
- `/home/hieu/projects/ng-21-learning/src/app/components/navbar/navbar.ts` — dispatch the real sign-out flow if the effect owns logout.
- `/home/hieu/projects/ng-21-learning/README.md` — document setup and the demo account environment variables.
- Existing specs near the touched files — add focused service/effect/component coverage for success and `401` failure if the current Angular/Vitest setup supports the required HTTP testing providers.

**Verification**
1. Run `npm test` and `npm run build` after implementation.
2. Start the built SSR server with documented `AUTH_DEMO_EMAIL` and `AUTH_DEMO_PASSWORD`; use `curl` to verify invalid credentials return `401`, valid credentials set an HttpOnly cookie, and logout clears it.
3. Open the SSR app on `http://localhost:4000/login`, verify valid login changes the navbar to Logout, invalid login displays an error, refresh behavior remains consistent with the current in-memory state/session scope, and logout clears the UI/session.
4. Confirm no login token is stored in NgRx, localStorage, or sessionStorage, and no route guard was added in this phase.

**Decisions**
- Backend: local Express API in this repository.
- Session: HttpOnly cookie; no client-side token handling, interceptor, or token persistence service.
- Account scope: one demo account configured through `AUTH_DEMO_EMAIL` and `AUTH_DEMO_PASSWORD`.
- Route scope: login becomes real, but dashboard/comments/about remain public until a separate protection requirement is requested.
- Development workflow: use the existing SSR build/server workflow rather than adding a proxy or process runner.

**Further Considerations**
1. This is real request/response authentication for local development, not durable user management. A database, password hashing, CSRF strategy, durable sessions, and HTTPS cookie configuration belong to a production-auth follow-up.
2. The current NgRx state is memory-only, so a browser refresh will clear the navbar even though the cookie survives. Adding `/api/auth/me` and startup hydration should be a separate decision rather than speculative scope.

// angular resolver to fetch blog post data
// should use ResolveFn type
// data should be dummy

import { inject, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { randomBytes } from 'crypto';

export const blogPostDataResolver: ResolveFn<Post[]> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);

  try {
    const key = makeStateKey<Post[]>(`blog-posts`);
    
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (transferState.hasKey(key)) {
      const data = transferState.get(key, null);
      transferState.remove(key);
      console.log(isPlatformBrowser(platformId), 'browser receive handoff data');
      return data!;
    }

    const mockData = [
      {
        title: 'Blog Post Title',
        body: 'Blog Post Content',
      },
      {
        title: 'Blog Post Title 2',
        body: 'Blog Post Content 2',
      },
      {
        title: 'Blog Post Title 3',
        body: 'Blog Post Content 3',
      },
      {
        title: 'Blog Post Title 4',
        body: 'Blog Post Content 4',
      },
      {
        title: 'Blog Post Title 5',
        body: 'Blog Post Content 5',
      },
    ];
    if (isPlatformServer(platformId)) {
      console.log('resolving data - server');
      transferState.set(key, mockData);
    }
    
    return mockData;
  } catch (error) {
    router.navigateByUrl('/error');
    return [];
  }
};

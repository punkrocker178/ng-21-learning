// angular resolver to fetch blog post data
// should use ResolveFn type
// data should be dummy

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post';

export const blogPostDataResolver: ResolveFn<Post[]> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  try {
    await new Promise(resolve => setTimeout(resolve, 2500));
    const mockData = [
      {
        title: 'Blog Post Title',
        content: 'Blog Post Content',
      },
      {
        title: 'Blog Post Title 2',
        content: 'Blog Post Content 2',
      },
      {
        title: 'Blog Post Title 3',
        content: 'Blog Post Content 3',
      },
      {
        title: 'Blog Post Title 4',
        content: 'Blog Post Content 4',
      },
      {
        title: 'Blog Post Title 5',
        content: 'Blog Post Content 5',
      },
    ];
    return mockData;
  } catch (error) {
    router.navigateByUrl('/error');
    return [];
  }
};

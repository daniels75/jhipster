import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogBlogModule)
      },
      {
        path: 'entry',
        loadChildren: () => import('./entry/entry.module').then(m => m.BlogEntryModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.BlogTagModule)
      },
      {
        path: 'simple-table',
        loadChildren: () => import('./simple-table/simple-table.module').then(m => m.BlogSimpleTableModule)
      },
      {
        path: 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.BlogTodoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BlogEntityModule {}

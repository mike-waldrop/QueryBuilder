import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryBuilderRootComponent } from 'src/app/query-builder/query-builder-root/query-builder-root.component';

const routes: Routes = [{
  path: 'querybuilder',
  component: QueryBuilderRootComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryBuilderRoutingModule { }

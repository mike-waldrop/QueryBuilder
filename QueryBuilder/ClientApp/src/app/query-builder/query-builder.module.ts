import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderRoutingModule } from './query-builder-routing.module';
import { QueryBuilderRootComponent } from './query-builder-root/query-builder-root.component';
import { QueryBuilderTreeComponent } from './query-builder-tree/query-builder-tree.component';
import { SharedModule } from '@progress/kendo-angular-dropdowns';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

@NgModule({
  declarations: [QueryBuilderRootComponent, QueryBuilderTreeComponent],
  imports: [
    CommonModule,
    SharedModule,
    QueryBuilderRoutingModule,
    TreeViewModule
  ],
  providers: [
    QueryBuilderService
  ],
  exports: [
  ]
})
export class QueryBuilderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderRoutingModule } from './query-builder-routing.module';
import { QueryBuilderRootComponent } from './query-builder-root/query-builder-root.component';
import { QueryBuilderTreeComponent } from './query-builder-tree/query-builder-tree.component';
import { SharedModule } from '@progress/kendo-angular-dropdowns';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';
import { QueryBuilderMenuComponent } from './query-builder-menu/query-builder-menu.component';
import { QueryBuilderConditionsComponent } from './query-builder-conditions/query-builder-conditions.component';
import { QueryBuilderResultsComponent } from './query-builder-results/query-builder-results.component';
import { EventsService } from 'src/app/query-builder/services/events.service/events.service';
import { QueryBuilderExpressionComponent } from './query-builder-expression/query-builder-expression.component';


@NgModule({
  declarations: [
    QueryBuilderRootComponent,
    QueryBuilderTreeComponent,
    QueryBuilderMenuComponent,
    QueryBuilderConditionsComponent,
    QueryBuilderResultsComponent,
    QueryBuilderExpressionComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    SharedModule,
    QueryBuilderRoutingModule,
    TreeViewModule
  ],
  providers: [
    QueryBuilderService,
    EventsService
  ],
  exports: [
  ]
})
export class QueryBuilderModule { }

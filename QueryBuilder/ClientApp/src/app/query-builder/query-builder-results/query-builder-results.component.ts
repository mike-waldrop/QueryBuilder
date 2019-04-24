import { Component, OnInit } from '@angular/core';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { replacer } from 'src/app/shared/utilities';

@Component({
  selector: 'query-builder-results',
  templateUrl: './query-builder-results.component.html',
  styleUrls: ['./query-builder-results.component.css']
})
export class QueryBuilderResultsComponent implements OnInit {

  data: string;

  constructor(private qbSvc: QueryBuilderService) { }

  ngOnInit() {
    this.qbSvc.queryCurrent.subscribe(e => {
      this.data = JSON.stringify(e, replacer, 4);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';

@Component({
  selector: 'query-builder-root',
  templateUrl: './query-builder-root.component.html',
  styleUrls: ['./query-builder-root.component.css']
})
export class QueryBuilderRootComponent implements OnInit {
  

  constructor(private qbSvc: QueryBuilderService) { }

  ngOnInit() {
    
  }

}

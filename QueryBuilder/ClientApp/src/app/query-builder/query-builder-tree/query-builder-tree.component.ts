import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';
import { CheckableSettings, TreeItemLookup } from '@progress/kendo-angular-treeview';
import { EventsService } from 'src/app/query-builder/services/events.service/events.service';
import { Condition } from 'src/app/query-builder/services/condition.model';
import { Operators } from 'src/app/query-builder/services/Operators';


@Component({
  selector: 'query-builder-tree',
  templateUrl: './query-builder-tree.component.html',
  styleUrls: ['./query-builder-tree.component.css']
})
export class QueryBuilderTreeComponent {
  
  public data: any[];
  public searchTerm = '';
  public parsedData: any[] = this.data;
  public selectedKeys: any[] = ['3_2'];
  public checkedKeys: any[] = ['1'];
    
  
  constructor(private qbSvc: QueryBuilderService, private eventsSvc: EventsService) { }

  ngOnInit(): void {
    this.qbSvc.getModel().subscribe(a => {
      this.data = a;
      this.parsedData = this.data;
    });
   
  }
   

  onAddClick(dataItem) {
    var condition = new Condition(dataItem.fullPath, Operators.EqualTo, "whatever");
    this.qbSvc.addCondition(condition);
  }
     
  
  public onkeyup(value: string): void {
    this.parsedData = this.search(this.data, value);
  }

  public search(items: any[], term: string): any[] {
    return items.reduce((acc, item) => {
      if (this.contains(item.text, term)) {
        acc.push(item);
      } else if (item.items && item.items.length > 0) {
        const newItems = this.search(item.items, term);

        if (newItems.length > 0) {
          acc.push({ text: item.text, items: newItems });
        }
      }

      return acc;
    }, []);
  }

  public contains(text: string, term: string): boolean {
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
  }
   
  public children = (dataitem: any): Observable<any[]> => {
    return of(dataitem.items);
  };
    
  public hasChildren = (dataitem: any): boolean => {
    return !!dataitem.items;
  };

 

}

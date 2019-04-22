import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { QueryBuilderService } from 'src/app/query-builder/services/query-builder.service/query-builder.service';

const is = (fileName: string, ext: string) => new RegExp(`.${ext}\$`).test(fileName);


@Component({
  selector: 'query-builder-tree',
  templateUrl: './query-builder-tree.component.html',
  styleUrls: ['./query-builder-tree.component.css']
})
export class QueryBuilderTreeComponent {
  
  public data: any[];
  public parsedData: any[] = this.data;
  public selectedKeys: any[] = ['3_2'];
  
  constructor(private qbSvc: QueryBuilderService) { }

  ngOnInit(): void {
    this.qbSvc.getModel().subscribe(a => {
      this.data = a;
      this.parsedData = this.data;
    });
   
  }

  public handleSelection({ index, dataItem }: any): void {
    this.selectedKeys = [index];
  }

  public iconClass({ text, items }: any): any {
    return {
      'k-i-file-pdf': is(text, 'pdf'),
      'k-i-folder': items !== undefined,
      'k-i-html': is(text, 'html'),
      'k-i-image': is(text, 'jpg|png'),
      'k-icon': true
    };
  }

  public searchTerm = '';

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

  /**
   * A function that returns an observable instance which contains the
   * [child nodes](https://www.telerik.com/kendo-angular-ui/components/treeview/api/TreeViewComponent/#toc-children)
   * for a given parent node.
   */
  public children = (dataitem: any): Observable<any[]> => {
    return of(dataitem.items);
  };

  /**
   * A function that determines whether a given node
   * [has children](https://www.telerik.com/kendo-angular-ui/components/treeview/api/TreeViewComponent/#toc-haschildren).
   */
  public hasChildren = (dataitem: any): boolean => {
    return !!dataitem.items;
  };

 

}

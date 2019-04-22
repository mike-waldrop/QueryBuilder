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

  //public data: any[] = [
  //  {
  //    text: 'Furniture', items: [
  //      {
  //        text: 'Tables & Chairs', items: [
  //          { text: 'Coffee tables' },
  //          { text: 'Poufs' }
  //        ]
  //      },
  //      { text: 'Sofas' },
  //      { text: 'Occasional Furniture' }
  //    ]
  //  },
  //  {
  //    text: 'Decor', items: [
  //      { text: 'Bed Linen' },
  //      { text: 'Curtains & Blinds' },
  //      { text: 'Carpets' }
  //    ]
  //  }
  //];

 


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
      if (this.contains(item.Text, term)) {
        acc.push(item);
      } else if (item.Items && item.Items.length > 0) {
        const newItems = this.search(item.Items, term);

        if (newItems.length > 0) {
          acc.push({ Text: item.Text, Items: newItems });
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
    return of(dataitem.Items);
  };

  /**
   * A function that determines whether a given node
   * [has children](https://www.telerik.com/kendo-angular-ui/components/treeview/api/TreeViewComponent/#toc-haschildren).
   */
  public hasChildren = (dataitem: any): boolean => {
    return !!dataitem.Items;
  };

  public data2: any[] = [
    {
      Text: "OrderId",
      FullPath: "OrderDetail.OrderId"
    },
    {
      Text: "FreightBillNumber",
      FullPath: "OrderDetail.FreightBillNumber"
    },
    {
      Text: "BOLNumber",
      FullPath: "OrderDetail.BOLNumber"
    },
    {
      Text: "Agency",
      FullPath: "OrderDetail.Agency",
      Items: [
        {
          Text: "AgencyCode",
          FullPath: "OrderDetail.Agency.AgencyCode"
        },
        {
          Text: "AgencyName",
          FullPath: "OrderDetail.Agency.AgencyName"
        },
        {
          Text: "AgencyOwner",
          FullPath: "OrderDetail.Agency.AgencyOwner"
        },
        {
          Text: "AgencyNumber",
          FullPath: "OrderDetail.Agency.AgencyNumber"
        },
        {
          Text: "PrimaryAgency",
          FullPath: "OrderDetail.Agency.PrimaryAgency"
        },
        {
          Text: "Addresses",
          FullPath: "OrderDetail.Agency.Addresses",
          Items: [
            {
              Text: "Description",
              FullPath: "OrderDetail.Agency.Addresses.Description"
            },
            {
              Text: "AddressId",
              FullPath: "OrderDetail.Agency.Addresses.AddressId"
            },
            {
              Text: "AddressType",
              FullPath: "OrderDetail.Agency.Addresses.AddressType"
            },
            {
              Text: "AddressLine1",
              FullPath: "OrderDetail.Agency.Addresses.AddressLine1"
            },
            {
              Text: "AddressLine2",
              FullPath: "OrderDetail.Agency.Addresses.AddressLine2"
            },
            {
              Text: "City",
              FullPath: "OrderDetail.Agency.Addresses.City"
            },
            {
              Text: "Region",
              FullPath: "OrderDetail.Agency.Addresses.Region"
            },
            {
              Text: "State",
              FullPath: "OrderDetail.Agency.Addresses.State",
              Items: [
                {
                  Text: "Id",
                  FullPath: "OrderDetail.Agency.Addresses.State.Id"
                },
                {
                  Text: "Code",
                  FullPath: "OrderDetail.Agency.Addresses.State.Code"
                },
                {
                  Text: "Description",
                  FullPath: "OrderDetail.Agency.Addresses.State.Description"
                }
              ]
            },
            {
              Text: "Country",
              FullPath: "OrderDetail.Agency.Addresses.Country",
              Items: [
                {
                  Text: "Id",
                  FullPath: "OrderDetail.Agency.Addresses.Country.Id"
                },
                {
                  Text: "Code",
                  FullPath: "OrderDetail.Agency.Addresses.Country.Code"
                },
                {
                  Text: "Description",
                  FullPath: "OrderDetail.Agency.Addresses.Country.Description"
                }
              ]
            },
            {
              Text: "PostalCode",
              FullPath: "OrderDetail.Agency.Addresses.PostalCode"
            },
            {
              Text: "GeoCoordinate",
              FullPath: "OrderDetail.Agency.Addresses.GeoCoordinate",
              Items: [
                {
                  Text: "Latitude",
                  FullPath: "OrderDetail.Agency.Addresses.GeoCoordinate.Latitude"
                },
                {
                  Text: "Longitude",
                  FullPath: "OrderDetail.Agency.Addresses.GeoCoordinate.Longitude"
                }
              ]
            }
          ]
        },
        {
          Text: "EmailAddresses",
          FullPath: "OrderDetail.Agency.EmailAddresses",
          Items: [
            {
              Text: "EmailId",
              FullPath: "OrderDetail.Agency.EmailAddresses.EmailId"
            },
            {
              Text: "EmailType",
              FullPath: "OrderDetail.Agency.EmailAddresses.EmailType"
            },
            {
              Text: "EmailAddress",
              FullPath: "OrderDetail.Agency.EmailAddresses.EmailAddress"
            }
          ]
        },
        {
          Text: "PhoneNumbers",
          FullPath: "OrderDetail.Agency.PhoneNumbers",
          Items: [
            {
              Text: "PhoneId",
              FullPath: "OrderDetail.Agency.PhoneNumbers.PhoneId"
            },
            {
              Text: "PhoneType",
              FullPath: "OrderDetail.Agency.PhoneNumbers.PhoneType"
            },
            {
              Text: "PhoneNumber",
              FullPath: "OrderDetail.Agency.PhoneNumbers.PhoneNumber"
            },
            {
              Text: "Extension",
              FullPath: "OrderDetail.Agency.PhoneNumbers.Extension"
            }
          ]
        },
        {
          Text: "Link",
          FullPath: "OrderDetail.Agency.Link",
          Items: [
            {
              Text: "Href",
              FullPath: "OrderDetail.Agency.Link.Href"
            },
            {
              Text: "Name",
              FullPath: "OrderDetail.Agency.Link.Name"
            },
            {
              Text: "Templated",
              FullPath: "OrderDetail.Agency.Link.Templated"
            }
          ]
        }
      ]
    },
    {
      Text: "Customer",
      FullPath: "OrderDetail.Customer",
      Items: [
        {
          Text: "CustomerName",
          FullPath: "OrderDetail.Customer.CustomerName"
        },
        {
          Text: "CustomerNumber",
          FullPath: "OrderDetail.Customer.CustomerNumber"
        },
        {
          Text: "Link",
          FullPath: "OrderDetail.Customer.Link",
          Items: [
            {
              Text: "Href",
              FullPath: "OrderDetail.Customer.Link.Href"
            },
            {
              Text: "Name",
              FullPath: "OrderDetail.Customer.Link.Name"
            },
            {
              Text: "Templated",
              FullPath: "OrderDetail.Customer.Link.Templated"
            }
          ]
        },
        {
          Text: "Name",
          FullPath: "OrderDetail.Customer.Name"
        },
        {
          Text: "Logo",
          FullPath: "OrderDetail.Customer.Logo"
        },
        {
          Text: "Locations",
          FullPath: "OrderDetail.Customer.Locations",
          Items: [
            {
              Text: "LocationId",
              FullPath: "OrderDetail.Customer.Locations.LocationId"
            },
            {
              Text: "LocationCode",
              FullPath: "OrderDetail.Customer.Locations.LocationCode"
            },
            {
              Text: "LocationType",
              FullPath: "OrderDetail.Customer.Locations.LocationType"
            },
            {
              Text: "Description",
              FullPath: "OrderDetail.Customer.Locations.Description"
            },
            {
              Text: "AddressId",
              FullPath: "OrderDetail.Customer.Locations.AddressId"
            },
            {
              Text: "AddressType",
              FullPath: "OrderDetail.Customer.Locations.AddressType"
            },
            {
              Text: "AddressLine1",
              FullPath: "OrderDetail.Customer.Locations.AddressLine1"
            },
            {
              Text: "AddressLine2",
              FullPath: "OrderDetail.Customer.Locations.AddressLine2"
            },
            {
              Text: "City",
              FullPath: "OrderDetail.Customer.Locations.City"
            },
            {
              Text: "Region",
              FullPath: "OrderDetail.Customer.Locations.Region"
            },
            {
              Text: "State",
              FullPath: "OrderDetail.Customer.Locations.State",
              Items: [
                {
                  Text: "Id",
                  FullPath: "OrderDetail.Customer.Locations.State.Id"
                },
                {
                  Text: "Code",
                  FullPath: "OrderDetail.Customer.Locations.State.Code"
                },
                {
                  Text: "Description",
                  FullPath: "OrderDetail.Customer.Locations.State.Description"
                }
              ]
            },
            {
              Text: "Country",
              FullPath: "OrderDetail.Customer.Locations.Country",
              Items: [
                {
                  Text: "Id",
                  FullPath: "OrderDetail.Customer.Locations.Country.Id"
                },
                {
                  Text: "Code",
                  FullPath: "OrderDetail.Customer.Locations.Country.Code"
                },
                {
                  Text: "Description",
                  FullPath: "OrderDetail.Customer.Locations.Country.Description"
                }
              ]
            },
            {
              Text: "PostalCode",
              FullPath: "OrderDetail.Customer.Locations.PostalCode"
            },
            {
              Text: "GeoCoordinate",
              FullPath: "OrderDetail.Customer.Locations.GeoCoordinate",
              Items: [
                {
                  Text: "Latitude",
                  FullPath: "OrderDetail.Customer.Locations.GeoCoordinate.Latitude"
                },
                {
                  Text: "Longitude",
                  FullPath: "OrderDetail.Customer.Locations.GeoCoordinate.Longitude"
                }
              ]
            }
          ]
        },
        {
          Text: "EmailAddresses",
          FullPath: "OrderDetail.Customer.EmailAddresses",
          Items: [
            {
              Text: "EmailId",
              FullPath: "OrderDetail.Customer.EmailAddresses.EmailId"
            },
            {
              Text: "EmailType",
              FullPath: "OrderDetail.Customer.EmailAddresses.EmailType"
            },
            {
              Text: "EmailAddress",
              FullPath: "OrderDetail.Customer.EmailAddresses.EmailAddress"
            }
          ]
        },
        {
          Text: "PhoneNumbers",
          FullPath: "OrderDetail.Customer.PhoneNumbers",
          Items: [
            {
              Text: "PhoneId",
              FullPath: "OrderDetail.Customer.PhoneNumbers.PhoneId"
            },
            {
              Text: "PhoneType",
              FullPath: "OrderDetail.Customer.PhoneNumbers.PhoneType"
            },
            {
              Text: "PhoneNumber",
              FullPath: "OrderDetail.Customer.PhoneNumbers.PhoneNumber"
            },
            {
              Text: "Extension",
              FullPath: "OrderDetail.Customer.PhoneNumbers.Extension"
            }
          ]
        },
        {
          Text: "Contacts",
          FullPath: "OrderDetail.Customer.Contacts",
          Items: [
            {
              Text: "ContactType",
              FullPath: "OrderDetail.Customer.Contacts.ContactType"
            },
            {
              Text: "Name",
              FullPath: "OrderDetail.Customer.Contacts.Name",
              Items: [
                {
                  Text: "FirstName",
                  FullPath: "OrderDetail.Customer.Contacts.Name.FirstName"
                },
                {
                  Text: "MiddleName",
                  FullPath: "OrderDetail.Customer.Contacts.Name.MiddleName"
                },
                {
                  Text: "LastName",
                  FullPath: "OrderDetail.Customer.Contacts.Name.LastName"
                },
                {
                  Text: "FullName",
                  FullPath: "OrderDetail.Customer.Contacts.Name.FullName"
                },
                {
                  Text: "Alias",
                  FullPath: "OrderDetail.Customer.Contacts.Name.Alias"
                }
              ]
            },
            {
              Text: "Addresses",
              FullPath: "OrderDetail.Customer.Contacts.Addresses",
              Items: [
                {
                  Text: "Description",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.Description"
                },
                {
                  Text: "AddressId",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.AddressId"
                },
                {
                  Text: "AddressType",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.AddressType"
                },
                {
                  Text: "AddressLine1",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.AddressLine1"
                },
                {
                  Text: "AddressLine2",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.AddressLine2"
                },
                {
                  Text: "City",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.City"
                },
                {
                  Text: "Region",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.Region"
                },
                {
                  Text: "State",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.State",
                  Items: [
                    {
                      Text: "Id",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.State.Id"
                    },
                    {
                      Text: "Code",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.State.Code"
                    },
                    {
                      Text: "Description",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.State.Description"
                    }
                  ]
                },
                {
                  Text: "Country",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.Country",
                  Items: [
                    {
                      Text: "Id",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.Country.Id"
                    },
                    {
                      Text: "Code",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.Country.Code"
                    },
                    {
                      Text: "Description",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.Country.Description"
                    }
                  ]
                },
                {
                  Text: "PostalCode",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.PostalCode"
                },
                {
                  Text: "GeoCoordinate",
                  FullPath: "OrderDetail.Customer.Contacts.Addresses.GeoCoordinate",
                  Items: [
                    {
                      Text: "Latitude",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.GeoCoordinate.Latitude"
                    },
                    {
                      Text: "Longitude",
                      FullPath: "OrderDetail.Customer.Contacts.Addresses.GeoCoordinate.Longitude"
                    }
                  ]
                }
              ]
            },
            {
              Text: "EmailAddresses",
              FullPath: "OrderDetail.Customer.Contacts.EmailAddresses",
              Items: [
                {
                  Text: "EmailId",
                  FullPath: "OrderDetail.Customer.Contacts.EmailAddresses.EmailId"
                },
                {
                  Text: "EmailType",
                  FullPath: "OrderDetail.Customer.Contacts.EmailAddresses.EmailType"
                },
                {
                  Text: "EmailAddress",
                  FullPath: "OrderDetail.Customer.Contacts.EmailAddresses.EmailAddress"
                }
              ]
            },
            {
              Text: "PhoneNumbers",
              FullPath: "OrderDetail.Customer.Contacts.PhoneNumbers",
              Items: [
                {
                  Text: "PhoneId",
                  FullPath: "OrderDetail.Customer.Contacts.PhoneNumbers.PhoneId"
                },
                {
                  Text: "PhoneType",
                  FullPath: "OrderDetail.Customer.Contacts.PhoneNumbers.PhoneType"
                },
                {
                  Text: "PhoneNumber",
                  FullPath: "OrderDetail.Customer.Contacts.PhoneNumbers.PhoneNumber"
                },
                {
                  Text: "Extension",
                  FullPath: "OrderDetail.Customer.Contacts.PhoneNumbers.Extension"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      Text: "Legs",
      FullPath: "OrderDetail.Legs",
      Items: [
        {
          Text: "Mode",
          FullPath: "OrderDetail.Legs.Mode"
        },
        {
          Text: "Operator",
          FullPath: "OrderDetail.Legs.Operator",
          Items: [
            {
              Text: "FirstName",
              FullPath: "OrderDetail.Legs.Operator.FirstName"
            },
            {
              Text: "LastName",
              FullPath: "OrderDetail.Legs.Operator.LastName"
            },
            {
              Text: "MiddleName",
              FullPath: "OrderDetail.Legs.Operator.MiddleName"
            },
            {
              Text: "OperatorCode",
              FullPath: "OrderDetail.Legs.Operator.OperatorCode"
            },
            {
              Text: "Link",
              FullPath: "OrderDetail.Legs.Operator.Link",
              Items: [
                {
                  Text: "Href",
                  FullPath: "OrderDetail.Legs.Operator.Link.Href"
                },
                {
                  Text: "Name",
                  FullPath: "OrderDetail.Legs.Operator.Link.Name"
                },
                {
                  Text: "Templated",
                  FullPath: "OrderDetail.Legs.Operator.Link.Templated"
                }
              ]
            }
          ]
        },
        {
          Text: "StartPoint",
          FullPath: "OrderDetail.Legs.StartPoint",
          Items: [
            {
              Text: "StopId",
              FullPath: "OrderDetail.Legs.StartPoint.StopId"
            },
            {
              Text: "SequenceId",
              FullPath: "OrderDetail.Legs.StartPoint.SequenceId"
            },
            {
              Text: "StopTypeCode",
              FullPath: "OrderDetail.Legs.StartPoint.StopTypeCode"
            },
            {
              Text: "PlanEvents",
              FullPath: "OrderDetail.Legs.StartPoint.PlanEvents",
              Items: [
                {
                  Text: "StopTypeCode",
                  FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.StopTypeCode"
                },
                {
                  Text: "UnitOfMeasure",
                  FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.UnitOfMeasure"
                },
                {
                  Text: "Items",
                  FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items",
                  Items: [
                    {
                      Text: "ActualHeightInches",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.ActualHeightInches"
                    },
                    {
                      Text: "ActualLengthInches",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.ActualLengthInches"
                    },
                    {
                      Text: "ActualQuantity",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.ActualQuantity"
                    },
                    {
                      Text: "ActualWeightPounds",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.ActualWeightPounds"
                    },
                    {
                      Text: "ActualWidthInches",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.ActualWidthInches"
                    },
                    {
                      Text: "CommodityCode",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.CommodityCode"
                    },
                    {
                      Text: "CreateDateTime",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.CreateDateTime"
                    },
                    {
                      Text: "Description",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.Description"
                    },
                    {
                      Text: "IsHighRisk",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.IsHighRisk"
                    },
                    {
                      Text: "IsHazmat",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.IsHazmat"
                    },
                    {
                      Text: "ItemId",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.ItemId"
                    },
                    {
                      Text: "OrderId",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.OrderId"
                    },
                    {
                      Text: "PlannedHeightInches",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.PlannedHeightInches"
                    },
                    {
                      Text: "PlannedLengthInches",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.PlannedLengthInches"
                    },
                    {
                      Text: "PlannedQuantity",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.PlannedQuantity"
                    },
                    {
                      Text: "PlannedWeightPounds",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.PlannedWeightPounds"
                    },
                    {
                      Text: "PlannedWidthInches",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.PlannedWidthInches"
                    },
                    {
                      Text: "HasProofOfDelivery",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.HasProofOfDelivery"
                    },
                    {
                      Text: "RateCodePerUnit",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.RateCodePerUnit"
                    },
                    {
                      Text: "HasTarrif",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.HasTarrif"
                    },
                    {
                      Text: "UpdateDateTime",
                      FullPath: "OrderDetail.Legs.StartPoint.PlanEvents.Items.UpdateDateTime"
                    }
                  ]
                }
              ]
            },
            {
              Text: "EarliestTime",
              FullPath: "OrderDetail.Legs.StartPoint.EarliestTime"
            },
            {
              Text: "LatestTime",
              FullPath: "OrderDetail.Legs.StartPoint.LatestTime"
            },
            {
              Text: "PlannedTime",
              FullPath: "OrderDetail.Legs.StartPoint.PlannedTime"
            },
            {
              Text: "ActualTime",
              FullPath: "OrderDetail.Legs.StartPoint.ActualTime"
            },
            {
              Text: "StopTime",
              FullPath: "OrderDetail.Legs.StartPoint.StopTime"
            },
            {
              Text: "CreateDateTime",
              FullPath: "OrderDetail.Legs.StartPoint.CreateDateTime"
            },
            {
              Text: "StreetAddress",
              FullPath: "OrderDetail.Legs.StartPoint.StreetAddress"
            },
            {
              Text: "City",
              FullPath: "OrderDetail.Legs.StartPoint.City"
            },
            {
              Text: "StateProvinceCode",
              FullPath: "OrderDetail.Legs.StartPoint.StateProvinceCode"
            },
            {
              Text: "ZipCode",
              FullPath: "OrderDetail.Legs.StartPoint.ZipCode"
            },
            {
              Text: "Latitude",
              FullPath: "OrderDetail.Legs.StartPoint.Latitude"
            },
            {
              Text: "Longitude",
              FullPath: "OrderDetail.Legs.StartPoint.Longitude"
            },
            {
              Text: "IsNextStop",
              FullPath: "OrderDetail.Legs.StartPoint.IsNextStop"
            },
            {
              Text: "IsVisited",
              FullPath: "OrderDetail.Legs.StartPoint.IsVisited"
            }
          ]
        },
        {
          Text: "EndPoint",
          FullPath: "OrderDetail.Legs.EndPoint",
          Items: [
            {
              Text: "StopId",
              FullPath: "OrderDetail.Legs.EndPoint.StopId"
            },
            {
              Text: "SequenceId",
              FullPath: "OrderDetail.Legs.EndPoint.SequenceId"
            },
            {
              Text: "StopTypeCode",
              FullPath: "OrderDetail.Legs.EndPoint.StopTypeCode"
            },
            {
              Text: "PlanEvents",
              FullPath: "OrderDetail.Legs.EndPoint.PlanEvents",
              Items: [
                {
                  Text: "StopTypeCode",
                  FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.StopTypeCode"
                },
                {
                  Text: "UnitOfMeasure",
                  FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.UnitOfMeasure"
                },
                {
                  Text: "Items",
                  FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items",
                  Items: [
                    {
                      Text: "ActualHeightInches",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.ActualHeightInches"
                    },
                    {
                      Text: "ActualLengthInches",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.ActualLengthInches"
                    },
                    {
                      Text: "ActualQuantity",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.ActualQuantity"
                    },
                    {
                      Text: "ActualWeightPounds",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.ActualWeightPounds"
                    },
                    {
                      Text: "ActualWidthInches",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.ActualWidthInches"
                    },
                    {
                      Text: "CommodityCode",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.CommodityCode"
                    },
                    {
                      Text: "CreateDateTime",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.CreateDateTime"
                    },
                    {
                      Text: "Description",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.Description"
                    },
                    {
                      Text: "IsHighRisk",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.IsHighRisk"
                    },
                    {
                      Text: "IsHazmat",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.IsHazmat"
                    },
                    {
                      Text: "ItemId",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.ItemId"
                    },
                    {
                      Text: "OrderId",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.OrderId"
                    },
                    {
                      Text: "PlannedHeightInches",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.PlannedHeightInches"
                    },
                    {
                      Text: "PlannedLengthInches",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.PlannedLengthInches"
                    },
                    {
                      Text: "PlannedQuantity",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.PlannedQuantity"
                    },
                    {
                      Text: "PlannedWeightPounds",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.PlannedWeightPounds"
                    },
                    {
                      Text: "PlannedWidthInches",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.PlannedWidthInches"
                    },
                    {
                      Text: "HasProofOfDelivery",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.HasProofOfDelivery"
                    },
                    {
                      Text: "RateCodePerUnit",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.RateCodePerUnit"
                    },
                    {
                      Text: "HasTarrif",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.HasTarrif"
                    },
                    {
                      Text: "UpdateDateTime",
                      FullPath: "OrderDetail.Legs.EndPoint.PlanEvents.Items.UpdateDateTime"
                    }
                  ]
                }
              ]
            },
            {
              Text: "EarliestTime",
              FullPath: "OrderDetail.Legs.EndPoint.EarliestTime"
            },
            {
              Text: "LatestTime",
              FullPath: "OrderDetail.Legs.EndPoint.LatestTime"
            },
            {
              Text: "PlannedTime",
              FullPath: "OrderDetail.Legs.EndPoint.PlannedTime"
            },
            {
              Text: "ActualTime",
              FullPath: "OrderDetail.Legs.EndPoint.ActualTime"
            },
            {
              Text: "StopTime",
              FullPath: "OrderDetail.Legs.EndPoint.StopTime"
            },
            {
              Text: "CreateDateTime",
              FullPath: "OrderDetail.Legs.EndPoint.CreateDateTime"
            },
            {
              Text: "StreetAddress",
              FullPath: "OrderDetail.Legs.EndPoint.StreetAddress"
            },
            {
              Text: "City",
              FullPath: "OrderDetail.Legs.EndPoint.City"
            },
            {
              Text: "StateProvinceCode",
              FullPath: "OrderDetail.Legs.EndPoint.StateProvinceCode"
            },
            {
              Text: "ZipCode",
              FullPath: "OrderDetail.Legs.EndPoint.ZipCode"
            },
            {
              Text: "Latitude",
              FullPath: "OrderDetail.Legs.EndPoint.Latitude"
            },
            {
              Text: "Longitude",
              FullPath: "OrderDetail.Legs.EndPoint.Longitude"
            },
            {
              Text: "IsNextStop",
              FullPath: "OrderDetail.Legs.EndPoint.IsNextStop"
            },
            {
              Text: "IsVisited",
              FullPath: "OrderDetail.Legs.EndPoint.IsVisited"
            }
          ]
        },
        {
          Text: "Tractor",
          FullPath: "OrderDetail.Legs.Tractor",
          Items: [
            {
              Text: "TractorNumber",
              FullPath: "OrderDetail.Legs.Tractor.TractorNumber"
            },
            {
              Text: "TractorModel",
              FullPath: "OrderDetail.Legs.Tractor.TractorModel"
            },
            {
              Text: "ModelYear",
              FullPath: "OrderDetail.Legs.Tractor.ModelYear"
            },
            {
              Text: "EmptyWeightPounds",
              FullPath: "OrderDetail.Legs.Tractor.EmptyWeightPounds"
            },
            {
              Text: "Link",
              FullPath: "OrderDetail.Legs.Tractor.Link",
              Items: [
                {
                  Text: "Href",
                  FullPath: "OrderDetail.Legs.Tractor.Link.Href"
                },
                {
                  Text: "Name",
                  FullPath: "OrderDetail.Legs.Tractor.Link.Name"
                },
                {
                  Text: "Templated",
                  FullPath: "OrderDetail.Legs.Tractor.Link.Templated"
                }
              ]
            }
          ]
        },
        {
          Text: "Trailer",
          FullPath: "OrderDetail.Legs.Trailer",
          Items: [
            {
              Text: "TrailerNumber",
              FullPath: "OrderDetail.Legs.Trailer.TrailerNumber"
            },
            {
              Text: "TrailerMake",
              FullPath: "OrderDetail.Legs.Trailer.TrailerMake"
            },
            {
              Text: "ModelYear",
              FullPath: "OrderDetail.Legs.Trailer.ModelYear"
            },
            {
              Text: "DoorOpeningHeightInches",
              FullPath: "OrderDetail.Legs.Trailer.DoorOpeningHeightInches"
            },
            {
              Text: "GrossCapacity",
              FullPath: "OrderDetail.Legs.Trailer.GrossCapacity"
            },
            {
              Text: "HeightInches",
              FullPath: "OrderDetail.Legs.Trailer.HeightInches"
            },
            {
              Text: "WidthInches",
              FullPath: "OrderDetail.Legs.Trailer.WidthInches"
            },
            {
              Text: "Link",
              FullPath: "OrderDetail.Legs.Trailer.Link",
              Items: [
                {
                  Text: "Href",
                  FullPath: "OrderDetail.Legs.Trailer.Link.Href"
                },
                {
                  Text: "Name",
                  FullPath: "OrderDetail.Legs.Trailer.Link.Name"
                },
                {
                  Text: "Templated",
                  FullPath: "OrderDetail.Legs.Trailer.Link.Templated"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      Text: "ETA",
      FullPath: "OrderDetail.ETA",
      Items: [
        {
          Text: "Earliest",
          FullPath: "OrderDetail.ETA.Earliest"
        },
        {
          Text: "Latest",
          FullPath: "OrderDetail.ETA.Latest"
        },
        {
          Text: "Estimate",
          FullPath: "OrderDetail.ETA.Estimate"
        },
        {
          Text: "Status",
          FullPath: "OrderDetail.ETA.Status"
        }
      ]
    },
    {
      Text: "LastLocation",
      FullPath: "OrderDetail.LastLocation",
      Items: [
        {
          Text: "Date",
          FullPath: "OrderDetail.LastLocation.Date"
        },
        {
          Text: "GeoCoordinate",
          FullPath: "OrderDetail.LastLocation.GeoCoordinate",
          Items: []
        },
        {
          Text: "City",
          FullPath: "OrderDetail.LastLocation.City"
        },
        {
          Text: "State",
          FullPath: "OrderDetail.LastLocation.State"
        }
      ]
    },
    {
      Text: "IsWatch",
      FullPath: "OrderDetail.IsWatch"
    }
  ];

}

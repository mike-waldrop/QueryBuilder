import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}

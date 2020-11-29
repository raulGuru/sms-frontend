import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() heading:string;
  @Input() subheading:string;
  @Input() icon:string;

  constructor() { }

  ngOnInit(): void {
  }

}

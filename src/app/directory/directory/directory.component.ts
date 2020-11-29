import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  heading = 'Directory';
  subheading = '';
  icon = 'pe-7s-note2 icon-gradient bg-happy-fisher';

  constructor() {}

  ngOnInit(): void {}
}

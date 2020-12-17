import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tagForm: FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required]],
      description: []
    });
  }

  get f() {
    return this.tagForm.controls;
  }

  submitAddTag() {
    console.log(this.tagForm.value);
  }

  open(content) {
    this.modalService
      .open(content, {
        size: 'md',
      })
      .result.then(
        (result) => {},
        (response) => {
          this.tagForm.reset();
        }
      );
  }
}

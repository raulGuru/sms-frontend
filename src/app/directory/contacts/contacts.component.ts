import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  closeResult = '';
  contactForm:FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [],
      mobile:['', [Validators.minLength(10),Validators.required]],
      email: ['', Validators.email],
      city: [],
      state: [],
      tags: [],
      fields: this.fb.array([
        this.fb.group({
          cField: [],
          cValue:[]
        })
      ])
    })
  }

  get fields() {
    return this.contactForm.get('fields') as FormArray;
  }

  addFields() {
    this.fields.push(this.fb.group({
      cField: [],
      cValue:[]
    }))
  }

  delFields(index: number) {
    this.fields.removeAt(index);
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubContactForm() {
    console.warn(this.contactForm.value);
  }

  open(content) {
    this.modalService
      .open(content, {
        size: 'md'
      })
      .result.then(
        (result) => {},
        (response) => {
          this.contactForm.reset()
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Contact } from '../directory.model';
import { DirectoryService } from '../directory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  // Form
  contactForm: FormGroup;
  contacts: Contact[] = [];
  contactId: number;
  contact: Contact;
  // Modal
  modalReference: NgbModalRef;
  editModalRef: NgbModalRef;
  // Pagination
  page: number = 1;
  perPage: number = 2;
  previousPage: number;
  totalItems: number;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public directoryService: DirectoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [],
      mobile: ['', [Validators.minLength(10), Validators.required]],
      email: ['', Validators.email],
      city: [],
      state: [],
      tags: [],
      fields: this.fb.array([
        this.fb.group({
          field: [],
          value: [],
        }),
      ]),
    });

    this.getContacts();
  }

  getContacts() {
    this.toastr.info('Getting Contact(s)...', 'Working...', { timeOut: 2000 });
    const params = {
      page: this.page,
      limit: this.perPage,
    }
    this.directoryService.allContact(params).subscribe(
      (response) => {
        this.toastr.success('Contact(s) Loaded', 'Awesome!', { timeOut: 2000 });
        this.contacts = response.data;
        this.totalItems = +response.total;
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getContacts();
    }
  }

  get fields() {
    return this.contactForm.get('fields') as FormArray;
  }

  addFields() {
    this.fields.push(
      this.fb.group({
        field: [],
        value: [],
      })
    );
  }

  delFields(index: number) {
    if (this.fields.controls.length > 1) {
      this.fields.removeAt(index);
    }
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubContactForm() {
    this.contactForm.value.id = this.contactId;
    console.log(this.contactForm.value);
    if (this.contactId) {
      this.onUpdateForm();
      return;
    }
    this.toastr.info('Adding Contact...', 'Working...', { timeOut: 2000 });
    this.directoryService.addContact(this.contactForm.value).subscribe(
      (response) => {
        this.toastr.success('Contact Added Successfully', 'Awesome!', {
          timeOut: 2000,
        });
        this.getContacts();
        this.modalReference.close();
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    );
  }

  onUpdateForm() {
    this.toastr.info('Updating Contact...', 'Working...', { timeOut: 2000 });
    this.directoryService
      .updateContact(this.contactId, this.contactForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('Contact Updated Successfully', 'Awesome!', {
            timeOut: 2000,
          });
          this.getContacts();
          this.editModalRef.close();
        },
        (error) => {
          this.toastr.error('Sorry, something went wrong', 'Error!', {
            timeOut: 2000,
          });
        }
      );
  }

  openAdd(content) {
    this.contactForm.reset();
    this.modalReference = this.modalService.open(content, {
      size: 'md',
    });
    this.modalReference.result.then(
      (result) => {},
      (response) => {}
    );
  }

  openView(content: any, id: number) {
    this.toastr.info('Getting Contact...', 'Working...', { timeOut: 2000 });
    this.directoryService.contactById(id).subscribe(
      (res) => {
        this.toastr.success('View Contact', 'Awesome!', { timeOut: 2000 });
        this.contact = res;
        this.modalService
          .open(content, {
            size: 'lg',
          })
          .result.then(
            (result) => {},
            (response) => {}
          );
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    );
  }

  openEdit(content, id) {
    this.toastr.info('Working...', 'Getting Contact...', { timeOut: 2000 });
    this.contactForm.reset();
    this.directoryService.contactById(id).subscribe(
      (res) => {
        this.toastr.success('Awesome!', 'View Contact', { timeOut: 2000 });
        this.contactId = res.id;
        this.contactForm.patchValue({
          name: res.name,
          mobile: res.mobile,
          email: res.email,
          city: res.city,
          state: res.state,
          tags: res.tags,
        });
        if (res.fields.length > 0) {
          this.fields.clear();
          res.fields.forEach((data) => {
            this.fields.push(
              this.fb.group({
                field: [data.field],
                value: [data.value],
              })
            );
          });
        }
        this.editModalRef = this.modalService.open(content, {
          size: 'md',
        });
        this.editModalRef.result.then(
          (result) => {},
          (response) => {}
        );
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    );
  }

  deleteContact(id: number) {
    this.toastr.info('Working...', 'Deleting Contact...', { timeOut: 2000 });
    this.directoryService.deleteById(id).subscribe(
      (res) => {
        this.toastr.success('Awesome!', 'Contact Deleted', { timeOut: 2000 });
        this.getContacts();
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    );
  }
}

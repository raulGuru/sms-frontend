import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { DirectoryService } from '../directory.service';
import { Tag } from '../directory.model'
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  //Form
  tagForm: FormGroup;
  tags: Tag[] = [];
  tag: Tag;
  tagId: number;
  //Modal
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
    this.tagForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [],
    });

    this.getTags();
  }

  getTags() {
    this.toastr.info('Getting Tag(s)...', 'Working...', { timeOut: 2000 });
    const params = {
      page: this.page,
      limit: this.perPage,
    }
    this.directoryService.allTags(params).subscribe((response) => {
      this.toastr.success('Tag(s) Loaded', 'Awesome!', { timeOut: 2000 });
      this.tags = response.data;
      this.totalItems = +response.total;
    })
  }

  get f() {
    return this.tagForm.controls;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getTags();
    }
  }

  submitTag() {
    this.tagForm.value.id = this.tagId;
    console.log(this.tagForm.value);
    if(this.tagId) {
      this.onUpdateForm();
      return;
    }
    this.toastr.info('Adding Tag...', 'Working...', { timeOut: 2000 });
    this.directoryService.addTag(this.tagForm.value).subscribe((response) => {
      this.toastr.success('Tag Added Successfully', 'Awesome!', {
        timeOut: 2000,
      });
      this.getTags();
      this.modalReference.close();
    });
  }

  onUpdateForm() {
    this.toastr.info('Updating Tag...', 'Working...', { timeOut: 2000 });
    this.directoryService
      .updateTag(this.tagId, this.tagForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('Tag Updated Successfully', 'Awesome!', {
            timeOut: 2000,
          });
          this.getTags();
          this.editModalRef.close();
        },
        (error) => {
          this.toastr.error('Sorry, something went wrong', 'Error!', {
            timeOut: 2000,
          });
        }
      );
  }

  openAdd(content: any) {
    this.tagForm.reset();
    this.modalReference = this.modalService.open(content, {
      size: 'md',
    });

    this.modalReference.result.then(
      (result) => {},
      (response) => {
        this.modalReference.close();
      }
    );
  }

  openView(content: any, id: number) {
    this.toastr.info('Getting Tag...', 'Working...', { timeOut: 2000 });
    this.directoryService.tagById(id).subscribe(
      (res) => {
        this.toastr.success('View Tag', 'Awesome!', { timeOut: 2000 });
        this.tag = res;
        this.modalService
          .open(content, {
            size: 'md',
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

  openEdit(content: any, id: number) {
    this.toastr.info('Working...', 'Getting Tag...', { timeOut: 2000 });
    this.tagForm.reset();
    this.directoryService.tagById(id).subscribe(
      (res) => {
        this.toastr.success('Awesome!', 'View Tag', { timeOut: 2000 });
        this.tagId = res.id;
        this.tagForm.patchValue({
          name: res.name,
          description: res.description,
        });
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

  deleteTag(id: number) {
    this.toastr.info('Working...', 'Deleting Tag...', { timeOut: 2000 });
    this.directoryService.deleteTagById(id).subscribe(
      (res) => {
        this.toastr.success('Awesome!', 'Tag Deleted', { timeOut: 2000 });
        this.getTags();
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    );
  }
}

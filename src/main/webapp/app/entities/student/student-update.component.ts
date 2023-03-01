import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  isSaving: boolean;
  dateobirthDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    phone: [],
    address: [],
    dateobirth: []
  });

  constructor(protected studentService: StudentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
    });
  }

  updateForm(student: IStudent) {
    this.editForm.patchValue({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      dateobirth: student.dateobirth
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    const entity = {
      ...new Student(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      email: this.editForm.get(['email']).value,
      phone: this.editForm.get(['phone']).value,
      address: this.editForm.get(['address']).value,
      dateobirth: this.editForm.get(['dateobirth']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
    result.subscribe((res: HttpResponse<IStudent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

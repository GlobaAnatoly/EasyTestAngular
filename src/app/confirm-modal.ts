import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AnswerVariant } from './models/answervariant.model';
import { Question } from './models/question.model';
import { Student } from './models/student.model';
import { Teacher } from './models/teacher.model';
import { TestService } from './services/test.service';

export interface ConfirmModel {
  title: string;
  message: string;
  id?: number;
  type?: string;
  data?: any;
}

@Component({
  selector: 'confirm',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{ title || 'Подтвердить' }}</h4>
      </div>
      <div class="modal-body">
        <p>{{ message || 'Вы уверены?' }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" (click)="cancel()">
          Отменить
        </button>
        <button type="button" class="btn btn-danger" (click)="confirm()">
          OK
        </button>
      </div>
    </div>
  `,
})
export class ConfirmComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  title!: string;
  message!: string;
  id?: number;
  type?: string;
  data?: any;
  constructor(private _testService: TestService, private router: Router) {
    super();
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    // this.productDataService.delete(this.prodId);
    if (this.type) {
      switch (this.type) {
        case 'test':
          this._testService.deleteTest(this.id as number).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          this.router.navigate(['/tests']).then(() => {
            window.location.reload();
          });
          break;
        case 'teacher':
          this._testService.deleteTeacher(this.id as number).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          this.router.navigate(['/teachers']).then(() => {
            window.location.reload();
          });
          break;
        case 'question':
          this._testService.deleteQuestion(this.id as number).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          this.router.navigate(['/tests']).then(() => {
            window.location.reload();
          });
          break;
        case 'answer':
          this._testService.deleteAnswerVariant(this.id as number).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          // this.router.navigate(['/tests']).then(() => {
          //   window.location.reload();
          // });
          break;
        case 'student':
          this._testService.deleteStudent(this.id as number).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          this.router.navigate(['/students']).then(() => {
            window.location.reload();
          });
          break;
        case 'teacherAdd':
          this._testService.postTeacher(this.data as Teacher).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          break;
        case 'studentAdd':
          console.log(this.data as Student);
          this._testService.postStudent(this.data as Student).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          // this.router.navigate(['/home']).then(() => {
          //   window.location.reload();
          // });
          break;
        case 'subjectDelete':
          console.log(this.data as Student);
          this._testService.deleteSubject(this.id as number).subscribe({
            next: (res) => console.log(res),
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();
          this.router.navigate(['/tests/add']).then(() => {
            window.location.reload();
          });
          break;
        case 'questionAdd':
          this._testService.postQuestion(this.data as Question).subscribe({
            next: (res) => {
              console.log(res);
              this.id = res.id;
              this.router.navigate(['/answers/add'], {
                queryParams: { questionId: this.id as number },
              });
            },
            error: (e) => console.error(e),
          });
          this.result = true;
          this.close();

          break;
        case 'answerAdd':
          this._testService
            .postAnswerVariant(this.data as AnswerVariant)
            .subscribe({
              next: (res) => console.log(res),
              error: (e) => console.error(e),
            });
          this.result = true;
          this.close();
          // this.router.navigate(['/home']).then(() => {
          //   window.location.reload();
          // });
          break;
        default:
          break;
      }
    } else {
      this.result = true;
      this.close();
    }
  }
  cancel() {
    this.result = false;
    this.close();
  }
}

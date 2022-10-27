import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { QuestionType } from 'src/app/models/questiontype.model';
import { Subject } from 'src/app/models/subject.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css'],
})
export class EditTestComponent implements OnInit {
  form!: FormGroup;
  test: Test = {
    id: 0,
    teacherId: 0,
    subjectId: 0,
    name: '',
  };
  teacherId: number = 0;
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  questions: Question[] = [];
  questionTypes: QuestionType[] = [];
  confirm: boolean = false;
  constructor(
    private _testService: TestService,
    public route: ActivatedRoute,
    private router: Router,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.getTest();
    this.getSubjects();
    this.getTeachers();
    this.getQuestions();
    this.getQuestionTypes();
    this.fillForm();
  }
  redirect() {
    const routes: string[] = ['/tests'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  editTest() {
    const formData = { ...this.form.value };
    const tempTest: Test = {
      id: this.test.id,
      name: formData.testName,
      teacherId: this.teachers.find(
        (obj) => obj.teacherName == formData.teacherName
      )?.id as number,
      subjectId: this.subjects.find((obj) => obj.name == formData.subjectName)
        ?.id as number,
    };
    this._testService.putTest(this.test.id, tempTest).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e),
    });
    this.redirect();
  }
  showAlert() {
    const formData = { ...this.form.value };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Удаление',
      message: 'Подтвердить удаление?',
      id: formData.id,
      type: 'test',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      console.log('confirmTs');
      this.deleteTest();
      // this.redirect();
    }
  }
  deleteTest() {
    this._testService.deleteTest(this.test.id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }
  getTest() {
    this.route.params.subscribe((params: Params) => {
      this._testService.getTest(+params['id']).subscribe({
        next: (data) => {
          this.test = data;
          this.form.controls['id'].setValue(data.id);
          this.form.controls['testName'].setValue(data.name);
          this._testService.getAllTeachers().subscribe({
            next: (dataT) => {
              this.form.controls['teacherName'].setValue(
                dataT.find((obj) => obj.id == data.teacherId)?.teacherName
              );
            },
          });
          this._testService.getAllSubjects().subscribe({
            next: (dataS) => {
              this.form.controls['subjectName'].setValue(
                dataS.find((obj) => obj.id == data.subjectId)?.name
              );
            },
          });
          // console.log(tmpTeacherName);
        },
        error: (e) => console.error(e),
      });
    });
  }
  getTeachers() {
    this._testService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (e) => console.error(e),
    });
  }
  getTeacherName(id: number | undefined): string {
    var tmp = this.teachers.find((obj) => obj.id == id)?.teacherName as string;
    // console.log(this.teachers);
    return tmp;
  }
  getSubjects() {
    this._testService.getAllSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (e) => console.error(e),
    });
  }
  getSubjectName(id: number | undefined): string {
    var tmp = this.subjects.find((obj) => obj.id == id)?.name as string;
    return tmp;
  }
  getQuestions() {
    this._testService.getAllQuestions().subscribe({
      next: (data) => {
        this.questions = data.filter((obj) => obj.testId == this.test.id);
      },
    });
  }
  getQuestionTypes() {
    this._testService.getAllQuestionTypes().subscribe({
      next: (data) => {
        this.questionTypes = data;
      },
    });
  }
  getQuestionTypeName(id: number | undefined): string {
    let tmp = this.questionTypes.find((obj) => {
      return obj.id == id;
    }) as QuestionType;

    return tmp.name;
  }
  goToAddQuestion() {
    this.router.navigate(['/questions/add'], {
      queryParams: { testId: this.test.id },
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(' ', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      testName: new FormControl(' ', [Validators.required]),
      teacherName: new FormControl(this.getTeacherName(this.test.teacherId), [
        Validators.required,
      ]),

      subjectName: new FormControl(' ', [Validators.required]),
    });
  }
}

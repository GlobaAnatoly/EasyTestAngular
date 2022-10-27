import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerVariant } from '../../models/answervariant.model';
import { Question } from '../../models/question.model';
import { QuestionType } from '../../models/questiontype.model';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';

import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  form!: FormGroup;
  question: Question = {
    id: 0,
    name: '',
    testId: 0,
    picture: null,
    questionTypeId: 0,
    value: 0,
  };
  picture: any = null;
  testId: number = 0;
  testName: string = '';
  tests: Test[] = [];
  answerVariants: AnswerVariant[] = [];
  questionTypes: QuestionType[] = [];
  confirm: boolean = false;
  questionId: number = 0;
  constructor(
    public route: ActivatedRoute,
    private _testService: TestService,
    private router: Router,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.fillForm();
    this.getTestName();
    this.getQuestionTypes();
  }
  redirect(id: number) {
    this.router.navigate(['/answers/add'], {
      queryParams: { questionId: id },
    });
  }
  getPicture(event: any) {
    const tmp = <File>event.target.files[0];
    let reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(tmp);
  }
  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.picture = btoa(binaryString);
  }
  saveQuestion() {
    const formData = { ...this.form.value };
    const questionTmp: Question = {
      id: 0,
      testId: this.testId,
      name: formData.questionName,
      picture: this.picture,
      questionTypeId: this.questionTypes.find(
        (obj) => obj.name == formData.questionType
      )?.id as number,
      value: formData.value,
    };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Добавление',
      message: 'Подтвердить добавление?',
      id: questionTmp?.id as number,
      data: questionTmp,
      type: 'questionAdd',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    // this._testService.postQuestion(questionTmp).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (e) => console.error(e),
    // });
  }
  getTestName() {
    this.route.queryParams.subscribe((params) => {
      this.testId = params['testId'];
    });

    this._testService.getTest(this.testId).subscribe({
      next: (data) => {
        this.testName = data.name;
        this.form.controls['testName'].setValue(data.name);
      },
    });
  }
  getQuestionTypes() {
    this._testService.getAllQuestionTypes().subscribe({
      next: (data) => {
        this.questionTypes = data;
        // console.log(this.questionTypes);
      },
      error: (e) => console.error(e),
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl('Формируется автоматически', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      testName: new FormControl('', [Validators.required]),
      questionName: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      questionType: new FormControl('', [Validators.required]),
      picture: new FormControl('', []),
    });
  }
}

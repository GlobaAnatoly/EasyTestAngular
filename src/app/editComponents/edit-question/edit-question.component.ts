import { Component, OnInit } from '@angular/core';
import { AnswerVariant } from 'src/app/models/answervariant.model';
import { Question } from 'src/app/models/question.model';
import { QuestionType } from 'src/app/models/questiontype.model';
import { Test } from 'src/app/models/test.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css'],
})
export class EditQuestionComponent implements OnInit {
  form!: FormGroup;
  question: Question = {
    id: 0,
    name: '',
    testId: 0,
    picture: null,
    questionTypeId: 0,
    value: 0,
  };
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
    this.getQuestion();
    this.getQuestionTypes();
    // this.getAnswerVariants();
    this.fillForm();
  }
  getQuestion() {
    this.route.params.subscribe((params: Params) => {
      this._testService.getQuestion(params['id']).subscribe({
        next: (data) => {
          this.question = data;
          this.questionId = params['id'];
          this.form.controls['id'].setValue(data.id);
          this.form.controls['questionName'].setValue(data.name);
          this._testService.getTest(data.testId).subscribe({
            next: (dataT) => {
              this.form.controls['testName'].setValue(dataT.name);
            },
          });
          this._testService.getQuestionType(data.questionTypeId).subscribe({
            next: (dataQ) => {
              this.form.controls['questionType'].setValue(dataQ.name);
            },
          });
          this._testService.getAllAnswerVariants().subscribe({
            next: (data) => {
              // console.log(this.question.id);
              this.answerVariants = data.filter(
                (answer) => answer.idQuestion == this.questionId
              );
              // console.log(this.answerVariants);
            },
            error: (e) => console.error(e),
          });
          this.form.controls['value'].setValue(data.value);
        },
      });
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

  editQuestion() {
    const formData = { ...this.form.value };
    const questionTmp: Question = {
      id: this.question.id,
      testId: this.question.testId,
      name: formData.questionName,
      picture: this.question.picture,
      questionTypeId: this.questionTypes.find(
        (obj) => obj.name == formData.questionType
      )?.id as number,
      value: formData.value,
    };
    // console.log(
    //   this.answerVariants.filter((answer) => answer.isCorrect == true)
    // );
    // if (questionTmp.questionTypeId == 1 || questionTmp.questionTypeId ==3) {

    // }
    if (
      this.answerVariants.filter((answer) => answer.isCorrect == true).length >
      0
    ) {
      console.log(questionTmp);
      this._testService.putQuestion(this.question.id, questionTmp).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });
      this.redirect();
    } else {
      this.SimpleModalService.addModal(ConfirmComponent, {
        title: 'Ошибка',
        message: 'Должны быть правильные ответы',
      }).subscribe((isConfirmed) => {
        // Get modal result
        // this.confirm = isConfirmed;
      });
    }
  }
  showAlert() {
    const formData = { ...this.form.value };
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Удаление',
      message: 'Подтвердить удаление?',
      id: formData.id,
      type: 'question',
    }).subscribe((isConfirmed) => {
      // Get modal result
      this.confirm = isConfirmed;
    });
    if (this.confirm) {
      this.deleteQuestion();
      // this.redirect();
    }
  }
  deleteQuestion() {
    this._testService.deleteQuestion(this.question.id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }
  redirect() {
    const routes: string[] = [`/tests/edit/${this.question.testId}`];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl(' ', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      testName: new FormControl(' ', [Validators.required]),
      questionName: new FormControl('', [Validators.required]),
      value: new FormControl(' ', [Validators.required]),
      questionType: new FormControl(' ', [Validators.required]),
    });
  }
  addAnswer() {
    this.router.navigate(['/answers/add'], {
      queryParams: {
        questionId: this.question.id,
        // questionType: this.question.questionTypeId,
      },
    });
  }
}

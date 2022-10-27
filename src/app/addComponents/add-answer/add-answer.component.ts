import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerVariant } from '../../models/answervariant.model';
import { Question } from '../../models/question.model';
import { TestService } from '../../services/test.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/confirm-modal';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css'],
})
export class AddAnswerComponent implements OnInit {
  form!: FormGroup;
  answervariant: AnswerVariant = {
    id: 0,
    idQuestion: 0,
    name: '',
    isCorrect: false,
  };
  question: Question = {
    id: 0,
    testId: 0,
    name: '',
    picture: undefined,
    questionTypeId: 0,
    value: 0,
  };
  confirm: boolean = false;
  questionId: number = 0;
  questionType: string = '';
  constructor(
    public route: ActivatedRoute,
    private _testService: TestService,
    private router: Router,
    private SimpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.fillForm();
    this.getQuestionName();
  }
  fillForm() {
    this.form = new FormGroup({
      id: new FormControl('Формируется автоматически', [
        // Validators.required,
        // Validators.pattern(new RegExp('^[0-9]*$')),
      ]),
      questionName: new FormControl('', [Validators.required]),
      answerName: new FormControl('', [Validators.required]),
      isCorrect: new FormControl('', [Validators.required]),
      questionTypeName: new FormControl('', [Validators.required]),
    });
  }
  getQuestionName() {
    this.route.queryParams.subscribe((params) => {
      this.questionId = params['questionId'];
    });
    this._testService.getQuestion(this.questionId).subscribe({
      next: (data) => {
        this.question = data;
        this.form.controls['questionName'].setValue(data.name);
        this._testService.getQuestionType(data.questionTypeId).subscribe({
          next: (dataQ) => {
            this.questionType = dataQ.name;
            this.form.controls['questionTypeName'].setValue(this.questionType);
          },
        });
      },
    });
  }
  saveAnswer() {
    var answers: AnswerVariant[] = [];
    this._testService.getAllAnswerVariants().subscribe({
      next: (data) => {
        answers = data.filter(
          (answer) => answer.idQuestion == this.question.id
        );
        var correct: boolean = false;
        if (this.form.controls['isCorrect'].value === 'true') correct = true;
        if (this.form.controls['isCorrect'].value === 'false') correct = false;
        if (this.question.questionTypeId == 1) {
          if (
            answers.find((answer) => answer.isCorrect == true) &&
            correct == true
          ) {
            this.showAlert(
              'Ошибка',
              'В этом вопросе может быть только один правильный ответ',
              null
            );
          } else {
            const formData = { ...this.form.value };
            var answer: AnswerVariant = {
              id: 0,
              idQuestion: this.question.id,
              name: formData.answerName,
              isCorrect: correct,
            };
            this.showAlert(
              'Подвердить',
              'Подтвердить добавление ответа',
              answer
            );
          }
        } else if (this.question.questionTypeId == 2) {
          const formData = { ...this.form.value };
          var answer: AnswerVariant = {
            id: 0,
            idQuestion: this.question.id,
            name: formData.answerName,
            isCorrect: correct,
          };
          this.showAlert('Подвердить', 'Подтвердить добавление ответа', answer);
        } else if (this.question.questionTypeId == 3) {
          if (
            correct == false ||
            answers.length == 1 &&
            answers.filter((answer) => answer.isCorrect == true).length == 1
          ) {
            this.showAlert(
              'Ошибка',
              'В этом вопросе может быть один правильный ответ',
              null
            );
          } else if (correct == true) {
            const formData = { ...this.form.value };
            var answer: AnswerVariant = {
              id: 0,
              idQuestion: this.question.id,
              name: formData.answerName,
              isCorrect: correct,
            };
            this.showAlert(
              'Подвердить',
              'Подтвердить добавление ответа',
              answer
            );
          }
        }
      },
    });
  }
  showAlert(title: string, message: string, data: any) {
    var type = data ? 'answerAdd' : '';
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: title,
      message: message,
      type: type,
      data: data,
    }).subscribe((isConfirmed) => {
      // Get modal result

      if (isConfirmed) {
        if (data != null) this.goToQuestions();
      }
    });
    if (this.confirm) {
      // this.deleteAnswer();
      // this.redirect();
    }
  }
  goToQuestions() {
    this.router.navigate([`/questions/edit/${this.question.id}`]).then(() => {
      window.location.reload();
    });
  }
}

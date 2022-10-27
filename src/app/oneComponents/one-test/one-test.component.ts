import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { QuestionType } from 'src/app/models/questiontype.model';
import { Subject } from 'src/app/models/subject.model';
import { Teacher } from 'src/app/models/teacher.model';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-one-test',
  templateUrl: './one-test.component.html',
  styleUrls: ['./one-test.component.css'],
})
export class OneTestComponent implements OnInit {
  test: Test = {
    id: 0,
    teacherId: 0,
    subjectId: 0,
    name: '',
  };
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  questions: Question[] = [];
  questionTypes: QuestionType[] = [];
  constructor(
    private _testService: TestService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTest();
  }
  getTest() {
    this.route.params.subscribe((params: Params) => {
      this._testService.getTest(+params['id']).subscribe({
        next: (data) => {
          this.test = data;
          this.getTeachers();
          this.getSubjects();
          this.getQuestions();
          this.getQuestionTypes();
        },
        // error: (e) => console.error(e),
      });
    });
  }
  redirect() {
    const routes: string[] = ['/tests'];
    this.router.navigate(routes).then(() => {
      window.location.reload();
    });
  }
  getTeachers() {
    this._testService.getAllTeachers().subscribe({
      next: (data) => {
        // console.log(data);
        this.teachers = data;
        // console.log(this.teachers);
      },
      // error: (e) => console.error(e),
    });

    // console.log(this.tests);
  }
  getTeacherName(id: number | undefined): string {
    var tmp = this.teachers.find((obj) => obj.id == id)?.teacherName as string;
    return tmp;
  }
  getSubjects() {
    this._testService.getAllSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
      },
      // error: (e) => console.error(e),
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
        console.log(this.questions);
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
}

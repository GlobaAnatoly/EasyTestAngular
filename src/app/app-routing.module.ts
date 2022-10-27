import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TestsComponent } from './tests/tests.component';
import { HttpClientModule } from '@angular/common/http';
import { EditTeacherComponent } from './editComponents/edit-teacher/edit-teacher.component';
import { EditTestComponent } from './editComponents/edit-test/edit-test.component';
import { EditQuestionComponent } from './editComponents/edit-question/edit-question.component';
import { EditAnswervariantComponent } from './editComponents/edit-answervariant/edit-answervariant.component';
import { StudentsComponent } from './students/students.component';
import { OneStudentComponent } from './oneComponents/one-student/one-student.component';
import { EditStudentComponent } from './editComponents/edit-student/edit-student.component';
import { AddTeacherComponent } from './addComponents/add-teacher/add-teacher.component';
import { AddStudentComponent } from './addComponents/add-student/add-student.component';
import { AddTestComponent } from './addComponents/add-test/add-test.component';
import { AddSubjectComponent } from './addComponents/add-subject/add-subject.component';
import { AddQuestionComponent } from './addComponents/add-question/add-question.component';
import { AddAnswerComponent } from './addComponents/add-answer/add-answer.component';
import { OneTeacherComponent } from './oneComponents/one-teacher/one-teacher.component';
import { OneTestComponent } from './oneComponents/one-test/one-test.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'tests', component: TestsComponent },
  // { path: 'authorization', component: AuthorizationComponent },
  { path: 'teachers/add', component: AddTeacherComponent },
  { path: 'teachers/:id', component: OneTeacherComponent },
  { path: 'tests/add', component: AddTestComponent },
  { path: 'tests/:id', component: OneTestComponent },
  { path: 'teachers/edit/:id', component: EditTeacherComponent },
  { path: 'tests/edit/:id', component: EditTestComponent },
  { path: 'questions/add', component: AddQuestionComponent },
  { path: 'questions/edit/:id', component: EditQuestionComponent },
  { path: 'answers/edit/:id', component: EditAnswervariantComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/add', component: AddStudentComponent },
  { path: 'students/:id', component: OneStudentComponent },
  { path: 'subjects/add', component: AddSubjectComponent },
  { path: 'students/edit/:id', component: EditStudentComponent },
  { path: 'answers/add', component: AddAnswerComponent },
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

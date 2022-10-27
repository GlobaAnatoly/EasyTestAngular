import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SimpleModalModule } from 'ngx-simple-modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal';
import { TeachersComponent } from './teachers/teachers.component';
import { TestsComponent } from './tests/tests.component';
import { OneTeacherComponent } from './oneComponents/one-teacher/one-teacher.component';
import { ItemTeacherComponent } from './itemComponents/item-teacher/item-teacher.component';
import { ItemTestComponent } from './itemComponents/item-test/item-test.component';
import { OneTestComponent } from './oneComponents/one-test/one-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TestService } from './services/test.service';


import { StudentsComponent } from './students/students.component';
import { ItemStudentComponent } from './itemComponents/item-student/item-student.component';
import { OneStudentComponent } from './oneComponents/one-student/one-student.component';
import { AddTeacherComponent } from './addComponents/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './editComponents/edit-teacher/edit-teacher.component';
import { EditTestComponent } from './editComponents/edit-test/edit-test.component';
import { EditAnswervariantComponent } from './editComponents/edit-answervariant/edit-answervariant.component';
import { EditQuestionComponent } from './editComponents/edit-question/edit-question.component';
import { EditStudentComponent } from './editComponents/edit-student/edit-student.component';
import { AddTestComponent } from './addComponents/add-test/add-test.component';
import { AddStudentComponent } from './addComponents/add-student/add-student.component';
import { AddQuestionComponent } from './addComponents/add-question/add-question.component';
import { AddSubjectComponent } from './addComponents/add-subject/add-subject.component';
import { AddAnswerComponent } from './addComponents/add-answer/add-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TeachersComponent,
    TestsComponent,
    OneTeacherComponent,
    ItemTeacherComponent,
    ItemTestComponent,
    OneTestComponent,
    EditTeacherComponent,
    EditTestComponent,
    EditQuestionComponent,
    EditAnswervariantComponent,
    StudentsComponent,
    ItemStudentComponent,
    OneStudentComponent,
    EditStudentComponent,
    AddTeacherComponent,
    AddTestComponent,
    AddStudentComponent,
    AddQuestionComponent,
    AddSubjectComponent,
    AddAnswerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SimpleModalModule.forRoot({ container: 'modal-container' }),
  ],
  providers: [TestService],
  bootstrap: [AppComponent],
})
export class AppModule {}

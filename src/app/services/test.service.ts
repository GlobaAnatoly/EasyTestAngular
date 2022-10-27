import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { Test } from '../models/test.model';
import { Subject } from '../models/subject.model';
import { StudentsTest } from '../models/studentstest.model';
import { Student } from '../models/student.model';
import { QuestionType } from '../models/questiontype.model';
import { Question } from '../models/question.model';
import { AnswerVariant } from '../models/answervariant.model';
const baseUrl = 'https://localhost:7232/api';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}
  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${baseUrl}/teachers`);
  }
  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${baseUrl}/tests`);
  }
  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${baseUrl}/subjects`);
  }
  getAllStudentsTest(): Observable<StudentsTest[]> {
    return this.http.get<StudentsTest[]>(`${baseUrl}/studentstests`);
  }
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${baseUrl}/students`);
  }
  getAllQuestionTypes(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>(`${baseUrl}/QuestionTypes`);
  }
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${baseUrl}/questions`);
  }
  getAllAnswerVariants(): Observable<AnswerVariant[]> {
    return this.http.get<AnswerVariant[]>(`${baseUrl}/AnswerVariants`);
  }
  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${baseUrl}/teachers/${id}`);
  }
  getTest(id: number): Observable<Test> {
    return this.http.get<Test>(`${baseUrl}/tests/${id}`);
  }
  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${baseUrl}/subjects/${id}`);
  }
  getStudentsTest(id: number): Observable<StudentsTest> {
    return this.http.get<StudentsTest>(`${baseUrl}/studentstests/${id}`);
  }
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${baseUrl}/students/${id}`);
  }
  getQuestionType(id: number): Observable<QuestionType> {
    return this.http.get<QuestionType>(`${baseUrl}/QuestionTypes/${id}`);
  }
  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${baseUrl}/questions/${id}`);
  }
  getAnswerVariant(id: number): Observable<AnswerVariant> {
    return this.http.get<AnswerVariant>(`${baseUrl}/answervariants/${id}`);
  }
  deleteTeacher(id: number): Observable<Teacher> {
    return this.http.delete<Teacher>(`${baseUrl}/teachers/${id}`);
  }
  deleteTest(id: number): Observable<Test> {
    return this.http.delete<Test>(`${baseUrl}/tests/${id}`);
  }
  deleteSubject(id: number): Observable<Subject> {
    return this.http.delete<Subject>(`${baseUrl}/subjects/${id}`);
  }
  deleteStudentsTest(id: number): Observable<StudentsTest> {
    return this.http.delete<StudentsTest>(`${baseUrl}/studentstests/${id}`);
  }
  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${baseUrl}/students/${id}`);
  }
  deleteQuestionType(id: number): Observable<QuestionType> {
    return this.http.delete<QuestionType>(`${baseUrl}/QuestionTypes/${id}`);
  }
  deleteQuestion(id: number): Observable<Question> {
    return this.http.delete<Question>(`${baseUrl}/questions/${id}`);
  }
  deleteAnswerVariant(id: number): Observable<AnswerVariant> {
    return this.http.delete<AnswerVariant>(`${baseUrl}/answervariants/${id}`);
  }
  postTeacher(data: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${baseUrl}/teachers`, data);
  }
  postTest(data: Test): Observable<Test> {
    return this.http.post<Test>(`${baseUrl}/tests`, data);
  }
  postSubject(data: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${baseUrl}/subjects`, data);
  }
  postStudentsTest(data: StudentsTest): Observable<StudentsTest> {
    return this.http.post<StudentsTest>(`${baseUrl}/studentstests`, data);
  }
  postStudent(data: Student): Observable<Student> {
    return this.http.post<Student>(`${baseUrl}/students`, data);
  }
  postQuestionType(data: QuestionType): Observable<QuestionType> {
    return this.http.post<QuestionType>(`${baseUrl}/QuestionTypes`, data);
  }
  postQuestion(data: Question): Observable<Question> {
    return this.http.post<Question>(`${baseUrl}/questions`, data);
  }
  postAnswerVariant(data: AnswerVariant): Observable<AnswerVariant> {
    return this.http.post<AnswerVariant>(`${baseUrl}/answervariants`, data);
  }
  putTeacher(id: number, data: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${baseUrl}/teachers/${id}`, data);
  }
  putTest(id: number, data: Test): Observable<Test> {
    return this.http.put<Test>(`${baseUrl}/tests/${id}`, data);
  }
  putSubject(id: number, data: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${baseUrl}/subjects/${id}`, data);
  }
  putStudentsTest(id: number, data: StudentsTest): Observable<StudentsTest> {
    return this.http.put<StudentsTest>(`${baseUrl}/studentstests/${id}`, data);
  }
  putStudent(id: number, data: Student): Observable<Student> {
    return this.http.put<Student>(`${baseUrl}/students/${id}`, data);
  }
  putQuestionType(id: number, data: QuestionType): Observable<QuestionType> {
    return this.http.put<QuestionType>(`${baseUrl}/QuestionTypes/${id}`, data);
  }
  putQuestion(id: number, data: Question): Observable<Question> {
    return this.http.put<Question>(`${baseUrl}/questions/${id}`, data);
  }
  putAnswerVariant(id: number, data: AnswerVariant): Observable<AnswerVariant> {
    return this.http.put<AnswerVariant>(
      `${baseUrl}/answervariants/${id}`,
      data
    );
  }
}

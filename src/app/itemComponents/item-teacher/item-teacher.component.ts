import { Component, Input, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-item-teacher',
  templateUrl: './item-teacher.component.html',
  styleUrls: ['./item-teacher.component.css'],
})
export class ItemTeacherComponent implements OnInit {
  @Input('teacher') teacher!: Teacher;
  constructor() {}

  ngOnInit(): void {
    
  }
}

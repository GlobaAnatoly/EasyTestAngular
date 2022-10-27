import { Component, OnInit } from '@angular/core';
import { Test } from '../models/test.model';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css'],
})
export class TestsComponent implements OnInit {
  tests!: Test[];
  constructor(private _testService: TestService) {}

  ngOnInit(): void {
    this._testService.getAllTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
    });
  }
}

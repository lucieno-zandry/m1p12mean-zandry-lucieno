import { Component, model, OnInit } from '@angular/core';
import { addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentWeek: Date[] = [];
  selectedDate = model.required<Date>();
  referenceDate: Date = new Date();

  ngOnInit(): void {
    this.generateWeek();
  }

  generateWeek() {
    const start = startOfWeek(this.referenceDate, { weekStartsOn: 1 }); // Monday
    this.currentWeek = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }

  selectDate(date: Date) {
    this.selectedDate.update(() => date);
  }

  nextWeek() {
    this.referenceDate = addWeeks(this.referenceDate, 1);
    this.generateWeek();
  }

  previousWeek() {
    this.referenceDate = subWeeks(this.referenceDate, 1);
    this.generateWeek();
  }
}

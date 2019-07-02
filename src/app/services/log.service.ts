import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();
  constructor() {

    // this.logs = [
    //   { id: '1', text: 'Generated components', date: new Date('06/29/2019 04:10:33') },
    //   { id: '2', text: 'Added Bootstrap', date: new Date('06/29/2019 05:09:45') },
    //   { id: '3', text: 'Added logs componentst', date: new Date('06/29/2019 05:29:17') },
    // ]
    this.logs = [];
  }
  getLogs(): Observable<Log[]> {

    // getting from localStorage
    if (localStorage.getItem('logs') === null) {
      this.logs = [];

    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }


    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage 
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }
  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);

      }
    });
    this.logs.unshift(log);

    // update to local storage 
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // Delete from local storage 
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}





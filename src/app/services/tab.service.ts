import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor() { }

  saveIndex(index, tab) {
    localStorage.setItem(`tabIndex${ tab }`, index);
  }

  getIndex(tab) {
    return localStorage.getItem(`tabIndex${ tab }`);
  }
}

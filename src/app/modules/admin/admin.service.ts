import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}
  readonly baseURL = environment.urlAPI; // 'https://localhost:44357/';
}

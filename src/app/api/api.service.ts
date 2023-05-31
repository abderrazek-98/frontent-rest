import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl ="http://localhost:3000";
  AllUsers="/api/users"
  constructor(private httpClient: HttpClient) {}
  getUsers(){
  return  this.httpClient.get(this.baseUrl+this.AllUsers);
  }

}

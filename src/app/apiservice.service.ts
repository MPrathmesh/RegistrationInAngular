import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService 
{
  apiUrl = "http://localhost:3000/users";
  createUrl = "http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  //Get All Data Observe....
  getAllUsers():Observable<any>
  {
    return this.http.get(`${this.apiUrl}`);
  }

  //Create Data
  createData(data:any):Observable<any>
  {
    console.log(data,'Data Created');
    return this.http.post(`${this.createUrl}`,data);
  }


}

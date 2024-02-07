import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl:string = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient){}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findById(id: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser (users: any): Observable<any> {
    console.log(users)
    return this.http.post<any>(this.apiUrl, users)
      
    
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
  
}

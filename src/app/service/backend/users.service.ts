import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/UserModel';
import { Observable } from 'rxjs/internal/Observable';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = 'https://restauration.onrender.com/api/users/users';
  users: any[] = [];

  constructor(private http: HttpClient) {

    }
    getUsers() {
      return this.http.get<any[]>('https://restauration.onrender.com/api/users/users');
    }
    getUser(id: string) {
      return this.http.get<UserModel>(`https://restauration.onrender.com/api/users/users/${id}`);
    }
    getUsersAdmin(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl);
    }
    deleteUser(id: string) {
      return this.http.delete(`https://restauration.onrender.com/api/users/users/${id}`);
    }
    addUser(data: UserModel) {
      return this.http.post('https://restauration.onrender.com/api/users/user', data);
    }
    addCategory(data: UserModel) {
      return this.http.post('https://restauration.onrender.com/api/users/user', data);
    }
    updateUser(id:string,category:any){
      return this.http.put<UserModel>(`https://restauration.onrender.com/api/users/users/${id}`,category)

    }
    getErrorMessage(fieldName:string, error:ValidationErrors):string{
      if(error['required']){
        //Le description de la catégorie est obligatoire.
      return fieldName +  "  de la utilisateur est obligatoire.";
      } else
      if (error['minlength']){
       // Le description de la catégorie doit avoir au moins 6 caractères
      return fieldName +  "   de la utilisateur doit avoir au moins "+ error['minlength']['requiredLength']+"caractères.";
      }
      else
      if (error['maxlength']){
        //Le description de la catégorie ne peut pas dépasser 15 caractères.
      return fieldName+  "   de la utilisateur ne peut pas dépasser "+ error['maxlength']['requiredLength']+"caractères.";

    } else if (error['email']) {
      return fieldName + " n'est pas de format email valide.";
    } else if (error['pattern']) {
      return fieldName + " doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.";
    }
    else if (error['patternphone']) {
      return fieldName + " doit contenir que des  8 chiffres .";
    }
       else return"";
      }

}

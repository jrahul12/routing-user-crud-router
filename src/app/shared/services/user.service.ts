import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../model/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = environment.BASE_URL
  USERS_URL: string = `${this.BASE_URL}/users-main.json`

  constructor(private _http: HttpClient) { }

  fetchAllData(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.USERS_URL).pipe(
      map((obj: any) => {
        let userArr: IUser[] = []
        for (const key in obj) {
          userArr.push({
            ...obj[key],
            userId: key
          })
        }
        return userArr
      })
    )
  }

  fetchById(id: string): Observable<IUser> {
    let URL = `${this.BASE_URL}/users-main/${id}.json`
    return this._http.get<IUser>(URL)
  }

  onAdd(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(this.USERS_URL, user)
  }

  onRemove(id: string): Observable<string> {
    let URL = `${this.BASE_URL}/users-main/${id}.json`
    return this._http.delete<string>(URL)
  }
  onUpdate(user: IUser): Observable<IUser> {
    let URL = `${this.BASE_URL}/users-main/${user.userId}.json`
    return this._http.patch<IUser>(URL, user)
  }
}

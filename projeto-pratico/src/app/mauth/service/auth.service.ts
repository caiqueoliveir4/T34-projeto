import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from './../model/user';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FirebaseApp } from '@angular/fire/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

    register(user: User): Observable<boolean> {
      return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password!))
        .pipe(
          switchMap((u: any) =>
          this.userCollection.doc(u.user.uid)
          .set({...user, id: u.user.uid})
          .then(() => true)
          ),
          catchError((err)=> throwError(err))
      )
    }

    login(email: string, password: string): Observable<any> {
       return from(this.afAuth.signInWithEmailAndPassword(email, password))
       .pipe(
         switchMap((u: any) => this.userCollection.doc<User>(u.user.uid).valueChanges()),
         catchError(() =>  throwError('Invalid Credentials or user is not registered.'))
       )
    }

    logout() {
      this.afAuth.signOut();
    }

    getUser(): Observable<any> {
      return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
      )
    }

    authenticated(): Observable<boolean> {
      return this.afAuth.authState
      .pipe(map(u => (u) ? true : false))
    }

}

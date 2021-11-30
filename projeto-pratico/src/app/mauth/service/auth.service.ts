import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from './../model/user';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';








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

    async updateUserDate(u: firebase.auth.UserCredential) {
      try {
        const newUser: any ={
          firstName: u.user?.displayName,
          lastName: '', address: '',city: '',
          state: '', phone: '', mobilePhone: '',
          email: u.user?.email,
          password: u.user?.uid
        };
         await this.userCollection.doc(u.user?.uid)
        .set(newUser);
        return newUser
        
      } catch (e) {
        console.log(e);
        throw new Error('Erro')
      }
    }

    async loginWithGoogleAccont() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        let credentials: firebase.auth.UserCredential = await this.afAuth.signInWithPopup(provider);
        let user: any = await this.updateUserDate(credentials)
        return user
      } catch (e) {
        console.log(e);
       throw new Error("Erro");
       
      }
    }


    loginGoogle(): Observable<any> {
     return from(this.loginWithGoogleAccont());
    }

}

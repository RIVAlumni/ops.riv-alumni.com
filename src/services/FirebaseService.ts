import { Observable } from 'rxjs';
import { docData } from 'rxfire/firestore';

import { auth, analytics, firestore, initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/remote-config';

import { User } from '../models';
import { count } from '../pipes';

import fbConfig from '../configs/firebase.json';

class FirebaseService {
  private static instance: FirebaseService;

  public get auth(): typeof auth {
    return auth;
  }

  public get database(): typeof firestore {
    return firestore;
  }

  public async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (e) {
      const { message }: auth.AuthError = e;
      console.error(message);
    }
  }

  public async signInWithGoogle(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();

    try {
      await auth().setPersistence(auth.Auth.Persistence.LOCAL);
      await auth().signInWithPopup(provider);
    } catch (e) {
      const { message }: auth.AuthError = e;
      console.error(message);
    }
  }

  public getUserDoc(uid: string): Observable<User> {
    return docData<User>(this.getUsersCol().doc(uid)).pipe(
      count('Firestore Reads')
    );
  }

  public getMemberDoc<T>(uid: string): Observable<T> {
    return docData<T>(this.getMembersCol().doc(uid)).pipe(
      count('Firestore Reads')
    );
  }

  public getEventDoc<T>(uid: string): Observable<T> {
    return docData<T>(this.getEventsCol().doc(uid)).pipe(
      count('Firestore Reads')
    );
  }

  public getParticipationDoc<T>(uid: string): Observable<T> {
    return docData<T>(this.getParticipationsCol().doc(uid)).pipe(
      count('Firestore Reads')
    );
  }

  public getUsersCol(): firestore.CollectionReference {
    return this.database().collection('users');
  }

  public getMembersCol(): firestore.CollectionReference {
    return this.database().collection('members');
  }

  public getEventsCol(): firestore.CollectionReference {
    return this.database().collection('events');
  }

  public getParticipationsCol(): firestore.CollectionReference {
    return this.database().collection('participations');
  }

  public getUsersAgnDoc(): firestore.DocumentReference {
    return this.database().doc('aggregations/users');
  }

  public getMembersAgnDoc(): firestore.DocumentReference {
    return this.database().doc('aggregations/members');
  }

  public getEventsAgnDoc(): firestore.DocumentReference {
    return this.database().doc('aggregations/events');
  }

  public getParticipationsAgnDoc(): firestore.DocumentReference {
    return this.database().doc('aggregations/participations');
  }

  private constructor() {
    initializeApp(fbConfig);
    analytics();
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }

    return FirebaseService.instance;
  }

  public sayHello(): void {
    return console.log(
      'im kept here because in my previous lives, i had a lot of issues'
    );
  }
}

export { FirebaseService };

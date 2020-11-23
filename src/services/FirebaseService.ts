import { Observable } from 'rxjs';
import { docData } from 'rxfire/firestore';

import { auth, analytics, firestore, initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/remote-config';

import { count } from '../pipes';
import {
  User,
  UserAggregation,
  MemberAggregation,
  EventAggregation,
  ParticipationAggregation,
} from '../models';

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

  public async signInWithGoogle(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();

    await auth().setPersistence(auth.Auth.Persistence.LOCAL);
    return auth().signInWithPopup(provider);
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

  public updateUserDoc(uid: string, data: User): Promise<void> {
    return this.database().doc(`users/${uid}`).set(data, { merge: true });
  }

  public updateMemberDoc(
    uid: string,
    data: firestore.DocumentData
  ): Promise<void> {
    return this.database().doc(`members/${uid}`).set(data, { merge: true });
  }

  public updateEventDoc(
    uid: string,
    data: firestore.DocumentData
  ): Promise<void> {
    return this.database().doc(`events/${uid}`).set(data, { merge: true });
  }

  public updateParticipationDoc(
    uid: string,
    data: firestore.DocumentData
  ): Promise<void> {
    return this.database()
      .doc(`participations/${uid}`)
      .set(data, { merge: true });
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

  public getUsersAgnDoc(): Observable<UserAggregation> {
    return docData<UserAggregation>(
      this.database().doc('aggregations/users')
    ).pipe(count('Firestore Reads'));
  }

  public getMembersAgnDoc(): Observable<MemberAggregation> {
    return docData<MemberAggregation>(
      this.database().doc('aggregations/members')
    ).pipe(count('Firestore Reads'));
  }

  public getEventsAgnDoc(): Observable<EventAggregation> {
    return docData<EventAggregation>(
      this.database().doc('aggregations/events')
    ).pipe(count('Firestore Reads'));
  }

  public getParticipationsAgnDoc(): Observable<ParticipationAggregation> {
    return docData<ParticipationAggregation>(
      this.database().doc('aggregations/participations')
    ).pipe(count('Firestore Reads'));
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

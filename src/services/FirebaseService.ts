import { Observable, throwError } from 'rxjs';
import { docData } from 'rxfire/firestore';

import { auth, analytics, firestore, initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/remote-config';

import { count } from '../pipes';
import {
  User,
  Member,
  Event,
  Participation,
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

  public getUserDoc(uid: string): Observable<User> {
    const ref = this.database().doc(`users/${uid}`);
    return docData<User>(ref).pipe(count('Firestore Reads'));
  }

  public getMemberDoc(uid: string | null): Observable<Member | never> {
    if (!uid) return throwError(new Error('Parameter `uid` is undefined.'));

    const ref = this.database().doc(`members/${uid}`);
    return docData<Member>(ref).pipe(count('Firestore Reads'));
  }

  public getEventDoc(uid: string): Observable<Event> {
    const ref = this.database().doc(`events/${uid}`);
    return docData<Event>(ref).pipe(count('Firestore Reads'));
  }

  public getParticipationDoc(uid: string): Observable<Participation> {
    const ref = this.database().doc(`participations/${uid}`);
    return docData<Participation>(ref).pipe(count('Firestore Reads'));
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
    const ref = this.database().doc('aggregations/users');
    return docData<UserAggregation>(ref).pipe(count('Firestore Reads'));
  }

  public getMembersAgnDoc(): Observable<MemberAggregation> {
    const ref = this.database().doc('aggregations/members');
    return docData<MemberAggregation>(ref).pipe(count('Firestore Reads'));
  }

  public getEventsAgnDoc(): Observable<EventAggregation> {
    const ref = this.database().doc('aggregations/events');
    return docData<EventAggregation>(ref).pipe(count('Firestore Reads'));
  }

  public getParticipationsAgnDoc(): Observable<ParticipationAggregation> {
    const ref = this.database().doc('aggregations/participations');
    return docData<ParticipationAggregation>(ref).pipe(
      count('Firestore Reads')
    );
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

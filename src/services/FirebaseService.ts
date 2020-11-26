import { Observable, throwError } from 'rxjs';
import { collectionData, docData } from 'rxfire/firestore';

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
    return this.fetchDocument<User>(ref);
  }

  public getMemberDoc(uid: string | null): Observable<Member | never> {
    if (!uid) return throwError(new Error('Parameter `uid` is undefined.'));

    const ref = this.database().doc(`members/${uid}`);
    return this.fetchDocument<Member>(ref);
  }

  public getEventDoc(uid: string): Observable<Event> {
    const ref = this.database().doc(`events/${uid}`);
    return this.fetchDocument<Event>(ref);
  }

  public getParticipationDoc(uid: string): Observable<Participation> {
    const ref = this.database().doc(`participations/${uid}`);
    return this.fetchDocument<Participation>(ref);
  }

  public getUsersCol(ref?: firestore.Query): Observable<User[]> {
    const dRef = this.database()
      .collection('users')
      .orderBy('Display Name', 'asc')
      .limit(10);

    return this.fetchCollection<User>(ref || dRef);
  }

  public getMembersCol(ref?: firestore.Query): Observable<Member[]> {
    const dRef = this.database()
      .collection('members')
      .orderBy('Full Name', 'asc')
      .limit(10);

    return this.fetchCollection<Member>(ref || dRef);
  }

  public getEventsCol(ref?: firestore.Query): Observable<Event[]> {
    const dRef = this.database()
      .collection('events')
      .orderBy('Event Code', 'asc')
      .limit(10);

    return this.fetchCollection<Event>(ref || dRef);
  }

  public getParticipationsCol(
    ref?: firestore.Query
  ): Observable<Participation[]> {
    const dRef = this.database()
      .collection('participations')
      .orderBy('Event Year', 'asc')
      .limit(10);

    return this.fetchCollection<Participation>(ref || dRef);
  }

  public getUsersAgnDoc(): Observable<UserAggregation> {
    const ref = this.database().doc('aggregations/users');
    return this.fetchDocument<UserAggregation>(ref);
  }

  public getMembersAgnDoc(): Observable<MemberAggregation> {
    const ref = this.database().doc('aggregations/members');
    return this.fetchDocument<MemberAggregation>(ref);
  }

  public getEventsAgnDoc(): Observable<EventAggregation> {
    const ref = this.database().doc('aggregations/events');
    return this.fetchDocument<EventAggregation>(ref);
  }

  public getParticipationsAgnDoc(): Observable<ParticipationAggregation> {
    const ref = this.database().doc('aggregations/participations');
    return this.fetchDocument<ParticipationAggregation>(ref);
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

  private fetchDocument<T>(ref: firestore.DocumentReference): Observable<T> {
    return docData<T>(ref).pipe(count('Firestore Reads'));
  }

  private fetchCollection<T>(ref: firestore.Query): Observable<T[]> {
    return collectionData<T>(ref).pipe(count('Firestore Reads'));
  }
}

export { FirebaseService };

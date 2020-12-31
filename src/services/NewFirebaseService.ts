import { combineLatest, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { docData, collectionData } from 'rxfire/firestore';

import { apps, auth, analytics, firestore, initializeApp } from 'firebase/app';
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

import prodConfig from '../configs/firebase.json';

const FirebaseService = () => {
  let firebase: firebase.app.App | undefined = undefined;

  const { convertDocumentQueryToObservable } = FirebaseServiceUtilities;

  if (apps.length === 0) {
    firebase = initializeApp(prodConfig);
    analytics();
  }

  const getUser = (uid: string): Observable<User> => {
    const ref = firestore().doc(`users/${uid}`);
    return convertDocumentQueryToObservable<User>(ref);
  };

  const getMember = (uid: string): Observable<Member> => {
    const ref = firestore().doc(`members/${uid}`);
    return convertDocumentQueryToObservable<Member>(ref);
  };

  const getEvent = (uid: string): Observable<Event> => {
    const ref = firestore().doc(`events/${uid}`);
    return convertDocumentQueryToObservable<Event>(ref);
  };

  const getParticipation = (uid: string): Observable<Participation> => {
    const ref = firestore().doc(`participations/${uid}`);
    return convertDocumentQueryToObservable<Participation>(ref);
  };

  // const getUsers = (): Observable<User[]> => {
  //   const ref = firestore().collection('users').limit(10);
  //   return convertCollectionQueryToObservable<User>(ref);
  // }

  // const getMembers = (): Observable<Member[]> => {
  //   const ref = firestore().collection('members').limit(10)
  //   return convertCollectionQueryToObservable<Member>(ref);
  // }

  // const getEvents = (): Observable<Event[]> => {
  //   const ref = firestore().collection('events').limit(10)
  //   return convertCollectionQueryToObservable<Event>(ref);
  // }

  // const getParticipations = (): Observable<Participation[]> => {
  //   const ref = firestore().collection('participations').limit(10)
  //   return convertCollectionQueryToObservable<Participation>(ref);
  // }

  const getUsersAggregation = (): Observable<UserAggregation> => {
    const ref = firestore().doc('aggregations/users');
    return convertDocumentQueryToObservable(ref);
  };

  const getMembersAggregation = (): Observable<MemberAggregation> => {
    const ref = firestore().doc('aggregations/members');
    return convertDocumentQueryToObservable(ref);
  };

  const getEventsAggregation = (): Observable<EventAggregation> => {
    const ref = firestore().doc('aggregations/events');
    return convertDocumentQueryToObservable(ref);
  };

  const getParticipationsAggregation = (): Observable<ParticipationAggregation> => {
    const ref = firestore().doc('aggregations/participations');
    return convertDocumentQueryToObservable(ref);
  };

  return {
    ...firebase,
    auth,
    analytics,
    firestore,
    getUser,
    getMember,
    getEvent,
    getParticipation,
    getUsersAggregation,
    getMembersAggregation,
    getEventsAggregation,
    getParticipationsAggregation,
  };
};

const FirebaseServiceUtilities = {
  convertDocumentQueryToObservable: <T>(
    ref: firestore.DocumentReference
  ): Observable<T> => docData<T>(ref).pipe(count('Firestore Reads')),

  convertCollectionQueryToObservable: <T>(
    ref: firestore.Query
  ): Observable<T[]> => collectionData<T>(ref).pipe(count('Firestore Reads')),

  mergeFullParticipationDetails: (
    docs: Participation[]
  ): Observable<(Member & Participation)[]> => {
    if (docs.length === 0) return from([]);

    return combineLatest(
      docs.map((participation) => {
        const uid = participation['Membership ID'];
        return FirebaseService()
          .getMember(uid)
          .pipe(map((member) => ({ ...member, ...participation })));
      })
    );
  },
};

export { FirebaseService, FirebaseServiceUtilities };

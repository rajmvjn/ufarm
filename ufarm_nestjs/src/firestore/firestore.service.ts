import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as firebase from 'firebase-admin';
import { FieldValue } from '@google-cloud/firestore';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirestoreService {
  public db: firebase.firestore.Firestore;

  constructor(private readonly configService: ConfigService) {
    const adminConfig: ServiceAccount = {
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKey: this.configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };

    if (!firebase.apps.length) {
      this.db = firebase
        .initializeApp({
          credential: firebase.credential.cert(adminConfig),
          databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
          storageBucket: 'ufarm-service.appspot.com',
        })
        .firestore();
    }
  }

  public timestamp(): FieldValue {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}

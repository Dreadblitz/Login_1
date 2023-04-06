import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './app.module';

@Injectable({
  providedIn: 'root',
})
export class PersonalCoysService {
  constructor() {}

  async obtenerPersonalCoys(): Promise<any[]> {
    const personalCoysRef = collection(db, 'Personal_Coys');
    const personalCoysSnapshot = await getDocs(personalCoysRef);
    return personalCoysSnapshot.docs.map((doc) => doc.data());
  }
}

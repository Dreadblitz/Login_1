import { Injectable } from '@angular/core';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './app.module';

@Injectable({
providedIn: 'root',
})
export class PersonalCoysService {
constructor() {}

async obtenerPersonalCoys(): Promise<any[]> {
const personalCoysRef = collection(db, 'Personal_Coys');
const personalCoysSnapshot = await getDocs(personalCoysRef);
return personalCoysSnapshot.docs.map((doc) => {
const data = doc.data();
data['id'] = doc.id; // Añadir el ID del documento para facilitar la actualización
return data;
});
}

// Método para actualizar el registro de Personal_Coys en Firebase
async actualizarPersonalCoys(personalCoys: any): Promise<void> {
if (!personalCoys.id) {
throw new Error('No se proporcionó el ID del documento');
}
const personalCoysRef = doc(db, 'Personal_Coys', personalCoys.id);
// Eliminar la propiedad 'id' del objeto para no almacenarla en Firebase
const { id, ...personalCoysData } = personalCoys;
await updateDoc(personalCoysRef, personalCoysData);
}

// Método para eliminar el registro de Personal_Coys en Firebase
async eliminarPersonalCoys(personal: any): Promise<void> {
const personalRef = doc(db, 'Personal_Coys', personal.id);
await deleteDoc(personalRef);
}

async agregarPersonalCoys(personalCoys: any): Promise<void> {
  const personalCoysRef = collection(db, 'Personal_Coys');
  personalCoys.id = ''; // Vaciar el ID antes de agregarlo a Firestore
  await addDoc(personalCoysRef, personalCoys);
}

}
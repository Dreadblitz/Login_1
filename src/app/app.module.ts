import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule

// Importa los módulos de AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// Importa la configuración de Firebase
import { firebaseConfig } from 'src/environments/firebase-config';
import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './personal/personal.component';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { PersonalFormComponent } from './personal-form/personal-form.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PersonalComponent,
    PersonalFormComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule, // Agrega FormsModule aquí
    ReactiveFormsModule, // Agrega ReactiveFormsModule aquí
    // Inicializa AngularFire con la configuración de Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule, // Agrega MatDialogModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

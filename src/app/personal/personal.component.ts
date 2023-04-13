import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonalCoysService } from '../personal-coys.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PersonalFormComponent } from '../personal-form/personal-form.component';
import { firstValueFrom, takeUntil } from 'rxjs';
import { Subject } from 'rxjs'; // Importa Subject aquí

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, AfterViewInit {
  personalCoysList: any[] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Legajo',
    'Nombre',
    'Apellido',
    'Cargo',
    'Dni',
    'Nro_Cell',
    'Mail_Empresa',
    'Mail_Personal',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private onDestroy = new Subject<void>(); // Agrega esto aquí

  constructor(
    private personalCoysService: PersonalCoysService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.personalCoysList);
  }

  async ngOnInit() {
    this.personalCoysList = await this.personalCoysService.obtenerPersonalCoys();
    this.personalCoysList = this.personalCoysList.map(personal => ({ ...personal, editMode: false }));
    this.dataSource.data = this.personalCoysList;

    this.personalCoysService
      .getPersonalCoysChangedObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.reloadData();
      });
  }

  async reloadData() {
    this.personalCoysList = await this.personalCoysService.obtenerPersonalCoys();
    this.personalCoysList = this.personalCoysList.map(personal => ({ ...personal, editMode: false }));
    this.dataSource.data = this.personalCoysList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(row: any) {
    if (!row.editMode) {
      row.originalData = { ...row }; // Almacena una copia de los datos originales antes de editar
    }
    row.editMode = !row.editMode;
  }

  async save(row: any) {
    await this.personalCoysService.actualizarPersonalCoys(row);
    row.editMode = false;
  }

  // Método cancelEditMode para cancelar la edición
  cancel(row: any) {
    row.editMode = false;
    // Revertir los cambios realizados en el modo de edición
    const index = this.personalCoysList.findIndex(personal => personal.id === row.id);
    if (index !== -1) {
      this.personalCoysList[index] = { ...row.originalData };
      this.dataSource.data = [...this.personalCoysList];
    }
  }


  async openAddPersonalDialog() {
    const dialogRef = this.dialog.open(PersonalFormComponent, {
      width: '800px',
    });
  
    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result) {
      this.personalCoysList.push(result);
      this.dataSource.data = [...this.personalCoysList];
      // Agregar un setTimeout para recargar la página
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } 
  
  
  async deleteRow(row: any) {
    const index = this.personalCoysList.findIndex(personal => personal.id === row.id);
    if (index !== -1) {
      await this.personalCoysService.eliminarPersonalCoys(row);
      this.personalCoysList.splice(index, 1);
      this.dataSource.data = [...this.personalCoysList];
    }
  }
}

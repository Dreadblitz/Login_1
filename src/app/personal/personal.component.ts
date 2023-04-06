import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonalCoysService } from '../personal-coys.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personalCoysService: PersonalCoysService) {
    this.dataSource = new MatTableDataSource(this.personalCoysList);
  }

  async ngOnInit() {
    this.personalCoysList = await this.personalCoysService.obtenerPersonalCoys();
    this.dataSource.data = this.personalCoysList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

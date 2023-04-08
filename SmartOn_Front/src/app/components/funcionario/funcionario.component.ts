import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/components/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Departamento } from 'src/app/models/Departamento';
import { DialogFuncionarioComponent } from './dialog-funcionario/dialog-funcionario.component';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cellPhone', 'address', 'wage', 'idDepartament', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog : MatDialog, private api : ApiService, private http : HttpClient) {
  }
  ngOnInit(): void {
  this.getAllFuncionario();
  }


  openDialog() {
    this.dialog.open(DialogFuncionarioComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
      }
      this.getAllFuncionario();
    })
  }

  getAllFuncionario(){
    this.api.getFuncionario()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Erro")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editFuncionario(row : any){
    this.dialog.open(DialogFuncionarioComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){

      }
      this.getAllFuncionario();

    })
  }

  deleteFuncionario(id: string ){
    this.api.deleteFuncionario(id)
    .subscribe({
      next:(res)=>{
        alert("Funcionário deletado com sucesso");
        this.getAllFuncionario();
      },
      error:()=>{
        alert("Não foi possivel deletar o funcionário")
      }
    })
  }

}

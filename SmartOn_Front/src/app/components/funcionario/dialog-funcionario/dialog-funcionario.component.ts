import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/components/services/api.service';
import { Departamento } from 'src/app/models/Departamento';

@Component({
  selector: 'app-dialog-funcionario',
  templateUrl: './dialog-funcionario.component.html',
  styleUrls: ['./dialog-funcionario.component.css']
})
export class DialogFuncionarioComponent implements OnInit{
  public departaments! : Departamento[];
  FuncionarioForm !: FormGroup;
  actionBtn: string = "Salvar"
 
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogFuncionarioComponent>) { }

  ngOnInit(): void {
    this.getAllDepartamento();
    this.FuncionarioForm = this.formBuilder.group({
      name: ['', Validators.required],
      cellPhone: ['', Validators.required],
      address: ['', Validators.required],
      wage: ['', Validators.required],
      idDepartament: ['', Validators.required],
    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Atualizar";
      this.FuncionarioForm.controls['name'].setValue(this.editData.name);
      this.FuncionarioForm.controls['cellPhone'].setValue(this.editData.cellPhone);
      this.FuncionarioForm.controls['address'].setValue(this.editData.address);
      this.FuncionarioForm.controls['wage'].setValue(this.editData. wage);
      this.FuncionarioForm.controls['idDepartament'].setValue(this.editData.idDepartament);
      
      this.getFuncionario
    }
  }

  AddFuncionario() {
    if (!this.editData) {
      if (this.FuncionarioForm.valid) {
        this.api.postFuncionario(this.FuncionarioForm.value)
          .subscribe({
            next: (res) => {
              alert("Funcionário adicionado com sucesso");
              this.FuncionarioForm.reset();
              this.dialogRef.close('Salvo');
              this.getFuncionario();
            },
            error: () => {
              alert("Erro não foi possivel adicionar o funcionário")
            }
          })
      }
    } else {
      this.updateFuncionario()
    }
  }

  updateFuncionario() {
    this.api.putFuncionario(this.FuncionarioForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Funcionário atualizado com sucesso");
          this.dialogRef.close('Atualizado'),
            this.getFuncionario
        },
        error: () => {
          alert("Erro não foi possivel atualizar o funcionário")
        }
      })
  }


  getFuncionario() {
    this.api.getFuncionario()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          alert("Erro")
        }
      })
  }


  getAllDepartamento() {
    this.api.getDepartamento()
      .subscribe(
        departaments => {
          this.departaments = departaments
          console.log(this.departaments)
        },
        (err) => {
          alert("Erro")
        },

      )
  }
}



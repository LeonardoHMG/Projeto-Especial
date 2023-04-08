import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/components/services/api.service';

@Component({
  selector: 'app-dialog-departamento',
  templateUrl: './dialog-departamento.component.html',
  styleUrls: ['./dialog-departamento.component.css']
})
export class DialogDepartamentoComponent implements OnInit {

  DepartamentoForm !: FormGroup;
  actionBtn: string = "Salvar"
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogDepartamentoComponent>) { }

  ngOnInit(): void {
    this.DepartamentoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Atualizar";
      this.DepartamentoForm.controls['name'].setValue(this.editData.name);
      this.DepartamentoForm.controls['description'].setValue(this.editData.description);
      this.getDepartamento
    }
  }

  AddDepartamento() {
    if (!this.editData) {
      if (this.DepartamentoForm.valid) {
        this.api.postDepartamento(this.DepartamentoForm.value)
          .subscribe({
            next: (res) => {
              alert("Departamento adicionado com sucesso");
              this.DepartamentoForm.reset();
              this.dialogRef.close('Salvo');
              this.getDepartamento();
            },
            error: () => {
              alert("Erro não foi possivel adicionar o departamento")
            }
          })
      }
    } else {
      this.updateDepartamento()
    }
  }

  updateDepartamento() {
    this.api.putDepartamento(this.DepartamentoForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Departamento atualizado com sucesso");
          this.dialogRef.close('Atualizado'),
            this.getDepartamento
        },
        error: () => {
          alert("Erro não foi possivel atualizar o departamento")
        }
      })
  }


  getDepartamento() {
    this.api.getDepartamento()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          alert("Erro")
        }
      })
  }
}

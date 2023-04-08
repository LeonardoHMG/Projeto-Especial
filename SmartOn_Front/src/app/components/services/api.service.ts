import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public search = new BehaviorSubject<string>("")

  constructor(private http : HttpClient) { }

  //Departamento

  postDepartamento (data : any) {
    return this.http.post<any>("https://localhost:7185/api/Departamento/", data);
  }

  getDepartamento(){
    return this.http.get<any>("https://localhost:7185/api/Departamento/");
  }

  putDepartamento(data:any, id : string){
    console.log(id, data);
    const info ={...data, id }
    return this.http.put<any>("https://localhost:7185/api/Departamento/"+ id ,info);

  }

  deleteDepartamento(id: string){
    return this.http.delete("https://localhost:7185/api/Departamento/" + id)
  }



  //Funcionario

  postFuncionario (data : any) {
    return this.http.post<any>("https://localhost:7185/api/Funcionario/", data);
  }

  getFuncionario(){
    return this.http.get<any>("https://localhost:7185/api/Funcionario/");
  }

  putFuncionario(data:any, id : string){
    console.log(id, data);
    const info ={...data, id }
    return this.http.put<any>("https://localhost:7185/api/Funcionario/"+ id ,info);

  }

  deleteFuncionario(id: string){
    return this.http.delete("https://localhost:7185/api/Funcionario/" + id)
  }
}






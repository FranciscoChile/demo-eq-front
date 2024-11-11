import { Component } from '@angular/core';
import { UserRecord } from '../services/userRecord';
import { RecordService } from '../services/record.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userRecordList: UserRecord[]  = [];
  file!: File;

  constructor(private api: RecordService){}

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  upload() {
    if (this.file) {
      this.api.uploadfile(this.file).subscribe(resp => {
        alert("Datos cargados")
      })
    } else {
      alert("Please select a file first")
    }
  }


  consultar() {

    this.api.getUserRecords().subscribe({
      next: (data : any) => {        
        const result = data.resultados;

        this.userRecordList = result.map((elem: any) => {
          var c = new UserRecord();

          c.id = elem.id;
          c.name = elem.nombre;
          c.rut = elem.rut;
          c.field1 = elem.datos[0].campo1;
          c.field2 = elem.datos[0].campo2;

          return c;
        });
      },
      error: (e) => {
        console.log('Error');
      }
    })



  }

}

import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {


  progress:any='0';

  constructor(private _fileUploadService:FileUploadService) { }

  ngOnInit(): void {

    this._fileUploadService.progress.subscribe(data=>{
      this.progress = data.total.toFixed();
      
    })
    
  }

  getFiles(event){

    let worker = new Worker('../../app.worker',{type:'module'})
    worker.onmessage=({data})=>{
      console.log(`Received data ${data}`);
    }

    const file:File= event[0];
    
    const reader = new FileReader();
    
    reader.readAsArrayBuffer(file);
  
    const doWork =function(callback){
      reader.onload=(function(f){
        return function(e){
  
          callback(this.result);
          
          
        }
      })(file)
    }
  
    doWork(response=>{
      

      this._fileUploadService.addFile(file.name, response)
  
    
  
    })
    
     


  }

}

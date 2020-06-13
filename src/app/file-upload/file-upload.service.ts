import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


   progress = new BehaviorSubject({total:0});
  constructor(private _angularFireDatabase:AngularFireDatabase,) { }

  addFile(fileName:string, byteList:ArrayBuffer){

    var storageRef = firebase.storage().ref();

    var fileRef = storageRef.child(`files/${fileName}`);
    fileRef.put(byteList)
    .on('state_changed',(snapshot)=>{
      var _progrees = ((snapshot.bytesTransferred/ snapshot.totalBytes)*100);
      this.progress.next({total:_progrees});
    })
    
    
  }
}

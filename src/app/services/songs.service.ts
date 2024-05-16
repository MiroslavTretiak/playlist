import { EventEmitter, Injectable } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  public songs:Song[]=[];

  public onSongsCountChange= new EventEmitter(); 
  public onStatusChange = new EventEmitter<Number>();

  constructor(private http:HttpClient, private authService:AuthService) { }

  public addSong(item:Song){
    this.songs.push(item);
    return this.http.post("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs.json",item).pipe(
      tap(()=>this.onSongsCountChange.emit())
    );
  }

  public loadData(){
  return this.http
  .get<{[key:string]:Song}>("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs.json")
  .pipe( 
      map( (data):Song[]=>{
        let songs=[];
          for (let x in data) {
            songs.push({...data[x], id:x })
      }
        this.songs=songs;
        this.onStatusChange.emit(0);
          return songs;
  }))
    .pipe(
      catchError( (er,c)=>{ 
        this.onStatusChange.emit(1);
      throw "Error";
    })
    )
  }

  public loadRecord (id:String) {
    return this.http.get<Song>("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json")
  }

  public editRecord (item:Song) {
    return this.http.patch("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs/"+item.id+".json", item);
  }

  public deleteRecord(id:string) {
    return this.http.delete("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json").pipe(
      tap(()=>this.onSongsCountChange.emit())
    );
  }
}

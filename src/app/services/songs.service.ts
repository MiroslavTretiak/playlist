import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  public songs:Song[]=[];

  constructor(private http:HttpClient) { }

  public addSong(item:Song){
    this.songs.push(item);
    return this.http.post("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs.json",item);
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
          return songs;
  }))
    .pipe(
      delay(1000)
      )
  }

  public loadRecord (id:String) {
    return this.http.get<Song>("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json")
  }

  public editRecord (item:Song) {
    return this.http.patch("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs/"+item.id+".json", item);
  }

  public deleteRecord(id:string) {
    return this.http.delete("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs/"+id+".json")
  }
}

import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SongsService {

  public songs:Song[]=[];

  constructor(private http:HttpClient) { }

  private addToDB(item:Song) {
    this.http.post("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs.json",item).subscribe(()=>{});
  }

  public addSong(item:Song){
    this.songs.push(item);
    this.addToDB(item);
  }

  public loadData(){
  return this.http.get<{[key:string]:Song}>("https://playlist-858f6-default-rtdb.europe-west1.firebasedatabase.app/songs.json");
  }
}

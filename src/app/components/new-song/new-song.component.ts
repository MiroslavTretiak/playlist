import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css'
})
export class NewSongComponent {

  public author:string|null=null;
  public songName:string|null=null;
  public genre:string|null=null;


  public constructor (private songsService:SongsService) {
   
  }

  public addSong(){
    if (this.author!=null && this.songName!=null && this.genre!=null){
    this.songsService.addSong({
      author:this.author,
      songName:this.songName,
      genre:this.genre,
      id:null,
    }).subscribe(()=>{
      this.author=null;
      this.songName=null;
      this.genre=null;
    });
  }
  }
}

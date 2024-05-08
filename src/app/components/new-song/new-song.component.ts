import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [FormsModule, LoadingComponent, CommonModule],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css'
})
export class NewSongComponent {

  public author:string|null=null;
  public songName:string|null=null;
  public genre:string|null=null;
  public isLoading=false;

  public constructor (private songsService:SongsService) {
   
  }

  public addSong(){
    if (this.author!=null && this.songName!=null && this.genre!=null){
    this.isLoading=true;
    this.songsService.addSong({
      author:this.author,
      songName:this.songName,
      genre:this.genre,
      id:null,
    }).subscribe(()=>{
      this.author=null;
      this.songName=null;
      this.genre=null;
      this.isLoading=false;
    });
  }
  }
}

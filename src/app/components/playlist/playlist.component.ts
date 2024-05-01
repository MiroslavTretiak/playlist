import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  public songs:Song[]=[];
  public constructor(private songsService:SongsService) {
    //this.songs=songsService.songs;

    let x = this.songsService.loadData();

    this.songsService.loadData().subscribe((data)=>{
      for (let x in data) {
        this.songs.push(data[x])
        console.log(data[x])
      }
    });
  }
}

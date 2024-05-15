import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  public songs:Song[]=[];

  public isLoading=false;
  public isError=false;

  public constructor(private songsService:SongsService, private authService:AuthService) {
    //this.songs=songsService.songs;
    this.loadData();
    this.authService.register("admin","admin", false);
  }

  private loadData(){
      let x = this.songsService.loadData();

    this.isLoading=true;
     this.isError=false;
    x.subscribe({
    next:(data)=>{
      this.songs=data;
      this.isLoading=false;
      this.isError=false;
    },
    error:(error)=>{
      this.isError=true;
      this.isLoading=false;
    }
    });
  }

  public deleteRecord(id:string|null) {
    if (id!=null) {
    this.isLoading=true;
    this.songsService.deleteRecord(id).subscribe(()=>{
      this.loadData();     
    });
  }
  }

  public closeError(){
    this.loadData();
  }
}

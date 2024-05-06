import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../../services/songs.service';
import { FormsModule } from '@angular/forms';
import { Song } from '../../models/song';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-song.component.html',
  styleUrl: './edit-song.component.css'
})
export class EditSongComponent {

  public id:string;
  public songName:string|null=null;
  public author:string|null=null;
  public genre:string|null=null;

  constructor(private route:ActivatedRoute, private songsService:SongsService, private router:Router) {
  this.id=this.route.snapshot.params['id'];
  this.songsService.loadRecord(this.id).subscribe((data)=>{
    this.songName=data.songName;
    this.author=data.author;
    this.genre=data.genre;
    console.log(data);
  })
  }

  public editRecord() {
    if (this.author!= null && this.songName!= null && this.genre!= null) {
    const record:Song={
      id:this.id,
      author:this.author,
      songName:this.songName,
      genre:this.genre,
    }
    this.songsService.editRecord(record).subscribe(()=>{
      this.router.navigate(['playlist']);
    });
  }

  }

}

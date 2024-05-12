import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count:number=0;

  constructor(private songsService:SongsService){
    this.loadCount();
    this.songsService.onSongsCountChange.subscribe(()=>this.loadCount());
  }

  private loadCount(){
    this.songsService.loadData().subscribe((data)=>{
      this.count=data.length;
    })
  }

}

import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count:number=0;
  public isError=false;
  public isLoggedin=false;

  constructor(private songsService:SongsService, private authService:AuthService){
    if(this.authService.isLoggedin){
    this.loadCount();
    }
    this.songsService.onSongsCountChange.subscribe(()=>this.loadCount());
    this.songsService.onStatusChange.subscribe(
      (status)=>{
        if (status==0){
          this.isError=false;
        } else {
          this.isError=true;
        }
      }
      );
      this.authService.onUserStatusChange.subscribe( (isLoggedin)=>{
        this.isLoggedin=isLoggedin;
        if(isLoggedin==true) this.loadCount();
      });
  }

  private loadCount(){
    this.songsService.loadData().subscribe((data)=>{
      this.count=data.length;
      this.isError=false;
    })
  }

}

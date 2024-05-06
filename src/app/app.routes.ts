 import { Routes } from '@angular/router';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { NewSongComponent } from './components/new-song/new-song.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';

export const routes: Routes = [

{path:"playlist", component:PlaylistComponent},
{path:"newsong", component:NewSongComponent},
{path:"edit/:id", component:EditSongComponent},

]
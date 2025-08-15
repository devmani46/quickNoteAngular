import { Routes } from '@angular/router';
import { NoteList } from './pages/note-list/note-list';
import { Mainlayout } from './pages/mainlayout/mainlayout';
import { NoteDetails } from './pages/note-details/note-details';
import { NoteCard } from './pages/note-card/note-card';

export const routes: Routes = [
  { path : '',component: Mainlayout  },
    { path : 'NoteDetails',component: NoteDetails  },
];

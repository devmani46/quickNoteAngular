import { Component } from '@angular/core';
import { NoteCard } from "../note-card/note-card";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteCard, RouterLink, FormsModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css'
})
export class NoteList {
  searchText: string = '';

  filterNotes(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log("Filter selected:", value);
  }
}

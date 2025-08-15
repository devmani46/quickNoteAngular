import { Component } from '@angular/core';
import { NoteCard } from "../note-card/note-card";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteCard, RouterLink],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css'
})
export class NoteList {
searchText: any;

}

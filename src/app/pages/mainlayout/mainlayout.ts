import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteList } from '../note-list/note-list';
import { NoteCard } from "../note-card/note-card";

@Component({
  selector: 'app-mainlayout',
  standalone: true,
  imports: [RouterOutlet, NoteList],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css'
})
export class Mainlayout {

}

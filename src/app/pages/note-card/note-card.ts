import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css'
})
export class NoteCard implements OnInit {

  notes: any[] = [];

  ngOnInit() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}

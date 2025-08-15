import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css'
})
export class NoteCard implements OnInit {

  @Input() searchText: string = '';
  notes: any[] = [];
  filteredNotes: any[] = [];

  ngOnInit() {
    this.loadNotes();
  }

  ngOnChanges() {
    this.applyFilter();
  }

  loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    this.notes = storedNotes ? JSON.parse(storedNotes) : [];
    this.applyFilter();
  }

  applyFilter() {
    const search = this.searchText.toLowerCase();
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(search) ||
      note.description.toLowerCase().includes(search)
    );
  }

  deleteNote(index: number) {
    const actualIndex = this.notes.indexOf(this.filteredNotes[index]);
    this.notes.splice(actualIndex, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.applyFilter();
  }
}

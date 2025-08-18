import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css'
})
export class NoteCard implements OnInit, OnChanges {

  @Input() searchText: string = '';
  @Input() sortOrder: string = 'newest';

  notes: any[] = [];
  filteredNotes: any[] = [];

  ngOnInit() {
    this.loadNotes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText'] || changes['sortOrder']) {
      this.applyFilterAndSort();
    }
  }

  loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    this.notes = storedNotes ? JSON.parse(storedNotes) : [];
    this.applyFilterAndSort();
  }

  applyFilterAndSort() {
    const search = this.searchText.toLowerCase();

    // Filter
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(search) ||
      note.description.toLowerCase().includes(search)
    );

    // Sort
    this.filteredNotes.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }

  deleteNote(index: number) {
    const actualIndex = this.notes.indexOf(this.filteredNotes[index]);
    this.notes.splice(actualIndex, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.applyFilterAndSort();
  }
}

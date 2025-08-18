// import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-note-card',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './note-card.html',
//   styleUrl: './note-card.css'
// })
// export class NoteCard implements OnInit, OnChanges {

//   @Input() searchText: string = '';
//   @Input() sortOrder: string = 'newest';

//   notes: any[] = [];
//   filteredNotes: any[] = [];

//   ngOnInit() {
//     this.loadNotes();
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     if (changes['searchText'] || changes['sortOrder']) {
//       this.applyFilterAndSort();
//     }
//   }

//   loadNotes() {
//     const storedNotes = localStorage.getItem('notes');
//     this.notes = storedNotes ? JSON.parse(storedNotes) : [];
//     this.applyFilterAndSort();
//   }

//   applyFilterAndSort() {
//     const search = this.searchText.toLowerCase();

//     // Filter
//     this.filteredNotes = this.notes.filter(note =>
//       note.title.toLowerCase().includes(search) ||
//       note.description.toLowerCase().includes(search)
//     );

//     // Sort
//     this.filteredNotes.sort((a, b) => {
//       const dateA = new Date(a.createdAt).getTime();
//       const dateB = new Date(b.createdAt).getTime();

//       return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
//     });
//   }

//   deleteNote(index: number) {
//     const actualIndex = this.notes.indexOf(this.filteredNotes[index]);
//     this.notes.splice(actualIndex, 1);
//     localStorage.setItem('notes', JSON.stringify(this.notes));
//     this.applyFilterAndSort();
//   }
// }


import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css'
})
export class NoteCard implements OnInit, OnChanges {

  @Input() searchText: string = '';
  @Input() sortOrder: string = 'newest';

  notes: any[] = [];
  filteredNotes: any[] = [];

  isEditModalOpen = false;
  editNote: any = { title: '', description: '' };
  editIndex: number | null = null;

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

    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(search) ||
      note.description.toLowerCase().includes(search)
    );

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

  openEditModal(index: number) {
    const actualIndex = this.notes.indexOf(this.filteredNotes[index]);
    this.editIndex = actualIndex;
    this.editNote = { ...this.notes[actualIndex] };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editNote = { title: '', description: '' };
    this.editIndex = null;
  }

  updateNote() {
    if (this.editIndex !== null) {
      this.notes[this.editIndex].title = this.editNote.title;
      this.notes[this.editIndex].description = this.editNote.description;
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.applyFilterAndSort();
      this.closeEditModal();
    }
  }
}

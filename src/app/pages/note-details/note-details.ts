import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './note-details.html',
  styleUrl: './note-details.css'
})
export class NoteDetails {

  noteForm = new FormGroup({
    noteTitle: new FormControl(''),
    noteDesc: new FormControl(''),
  });

  constructor(private router: Router) { }

  ngOnInit() { }


  onSubmit() {
    const note = this.noteForm.value;

    if (note.noteTitle?.trim() && note.noteDesc?.trim()) {
      const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');

      existingNotes.push({
        title: note.noteTitle,
        description: note.noteDesc,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('notes', JSON.stringify(existingNotes));
      console.log('Note saved:', note);
      this.router.navigate(['/']);
    } else {
      console.warn('Both title and description are required.');
    }
  }

  closeNote() {
    this.router.navigate(['/note-list']);
  }
}

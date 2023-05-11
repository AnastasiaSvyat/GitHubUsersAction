import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CommentComponent>,
  ) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.maxLength(100), Validators.minLength(10), Validators.required]),
    })
  }

  get comment() { return this.commentForm.get('comment'); }

  close() {
    this.dialogRef.close()
  }

  create(comment: string) {
    this.dialogRef.close(comment)
  }

}

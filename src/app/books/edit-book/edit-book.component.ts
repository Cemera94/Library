import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookId: number = 0;
  book: Book = new Book();

  get ISBN() { return this.form.get("ISBN"); }
  get title() { return this.form.get("title"); }
  get author() { return this.form.get("author"); }
  get yearOfPublication() { return this.form.get("yearOfPublication"); }
  get publisher() { return this.form.get("publisher"); }

  constructor(private service: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id'];
    });
    if (this.bookId) {
      this.service.getBookDetails(this.bookId).subscribe({
        next: (response: any) => {
          this.book = response;
          this.form.patchValue(this.book);
        },
        error: (response: any) => {
          console.log('error: ', response.statusText);
        }
      })
    }
  }

  onEdit(){
    let updatedBook: Book = new Book(this.form.value);
    updatedBook._id = this.bookId;

    this.service.updateBook(this.bookId, updatedBook).subscribe({
      next: (result: Book)=>{
        this.router.navigate(['/books', this.bookId])
      }
    })
  }

  form: FormGroup = new FormGroup({
    ISBN: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    yearOfPublication: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required])
  })
}

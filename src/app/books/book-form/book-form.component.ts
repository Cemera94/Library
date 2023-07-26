import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book, BookSearchResult } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  books: Book[] = [];
  count: number = 0;
  newId: number = 0;

  edit = false;

  constructor(private service: BookService, private router: Router) { }

  ngOnInit(): void {
    this.getBooks();

  }

  form: FormGroup = new FormGroup({
    ISBN: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    yearOfPublication: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required])
  })

  get ISBN() { return this.form.get("ISBN"); }
  get title() { return this.form.get("title"); }
  get author() { return this.form.get("author"); }
  get yearOfPublication() { return this.form.get("yearOfPublication"); }
  get publisher() { return this.form.get("publisher"); }

  onSubmit(){
    let newBook: Book = new Book(this.form.value);
    newBook._id = this.newId;    

    this.service.createBook(newBook).subscribe({
      next: (addedBook: Book)=>{
        this.router.navigate(['/books/', newBook._id])
      }
    })
  }

  getBooks(){
    this.service.getAll().subscribe({
      next: (result: BookSearchResult)=>{
        this.books = result.results;
        this.count = result.count;
        this.newId = result.count+1;
                
      }
    })
  }

  

}

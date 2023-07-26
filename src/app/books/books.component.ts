import { Component, OnInit } from '@angular/core';
import { Book, BookSearchResult } from '../model/book.model';
import { BookService } from '../service/book.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  count: number = 0;

  params = {
    page: 1,
    pageSize: 10,
    filter: {
      author: '',
      title: ''
    }
  }

  search = new FormControl("");

  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.service.getAll(this.params).subscribe({
      next: (result: BookSearchResult)=>{
        this.books = result.results;
        this.count = result.count;        
      }
    })
  }

  getValue(data: any){
    if (data.target.value == 'title') {
      this.params.filter.title = this.search.value || "";      
    }else if(data.target.value == 'author') {
      this.params.filter.author = this.search.value || "";
    }
    this.getBooks();
    
  }

  onLoadMoreClicked(pageSize: number){
    this.params.pageSize += 10;
    this.getBooks();
  }
}

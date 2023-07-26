import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book, BookSearchResult } from '../model/book.model';
import { Review } from '../model/review.model';

const baseUrl = "http://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(params?: any): Observable<BookSearchResult> {
    let queryParams = {}

    if(params) {
      queryParams = {
        params: new HttpParams().set('page', params.page)
        .set('pageSize', params.pageSize)
        .set(
          'filter',
          (params.filter && JSON.stringify(params.filter)) || ''
        )
      }
    }

    return this.http.get(`${baseUrl}/books`, queryParams).pipe(map((data:any) => {
      return new BookSearchResult(data);
    }))
  }

  getBookDetails(id: number): Observable<Book> {
    return this.http.get(baseUrl + '/books' + '/' + id).pipe(
      map((elem: any) => {
        return new Book(elem);
      })
    );
  }

  getReviews(id: number): Observable<Review[]> {
    return this.http.get(`${baseUrl}/books/${id}/reviews`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Review(elem)) || []
    }))
  }

  deleteReview(reviewId: number): Observable<Review> {
    return this.http.delete(`${baseUrl}/reviews/${reviewId}`).pipe(map((data: any) => {
      return new Review(data);
    }))
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post(`${baseUrl}/books`, book).pipe(map((data: any) => {
      return new Book(data);
    }))
  }

  updateBook(bookId: number, book: Book): Observable<Book> {
    return this.http.put(baseUrl + '/books/' + bookId, book).pipe(
      map((data: any) => {
        return new Book(data);
      })
    );
  }
}

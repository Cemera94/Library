import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/model/book.model';
import { Review } from 'src/app/model/review.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookId: number = 0;
  book: Book = new Book();
  reviews: Review[] = [];
  avgScore: number = 0;
  score: number = 0;
  


  constructor(private service: BookService, private route: ActivatedRoute, config: NgbRatingConfig) { 
    config.max = 5;
	  config.readonly = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.getBookDetails();
      this.getReviews();
    });
  }

  getBookDetails() {
    this.service.getBookDetails(this.bookId).subscribe({
      next: (response: Book) => {
        this.book = response;
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }

  getReviews(){
    this.service.getReviews(this.bookId).subscribe({
      next : (result: Review[]) => {
        this.reviews = result;
        console.log(this.reviews);
        this.findAvgScore();        

        
      }
    })
  }

  findAvgScore(){
    for (let i = 0; i < this.reviews.length; i++) {
      this.score+= this.reviews[i].score;
    }
    this.avgScore = this.score / this.reviews.length;
        
  }

  deleteReview(reviewId: number){
    this.service.deleteReview(reviewId).subscribe({
      next: (result: Review) => {
        this.findAvgScore();
        this.getReviews();
        
      }
    })

  }
}

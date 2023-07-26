import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'add-book', component: BookFormComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: '', redirectTo: '/home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

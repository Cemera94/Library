import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SideBarComponent,
    BooksComponent,
    BookFormComponent,
    BookItemComponent,
    BookDetailComponent,
    EditBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

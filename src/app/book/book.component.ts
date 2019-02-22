import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
    books: Book[];

    constructor(private bookService: BookService) {}
    ngOnInit(): void {
        this.getBooks();
    }
    getBooks(): void {
        this.bookService.getAllBooks()
        .subscribe((bookData) => {
            this.books = bookData;
            console.log(this.books, bookData);
         }, (error) => {
            console.log(error);
        });
    }
}

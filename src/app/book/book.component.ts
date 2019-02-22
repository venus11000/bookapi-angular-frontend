import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
    book = new Book();
    books: Book[];

    constructor(private bookService: BookService) {}
    ngOnInit(): void {
        this.getBooks();
    }
    private reset(): void {
        this.book.id = null;
        this.book.title = null;
        this.book.author = null;
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
    addBook(): void {
        this.bookService.addBook(this.book)
        .subscribe((response) => {
            console.log(response);
            this.reset();
            this.getBooks();
        }, (error) => {
            if (error.hasOwnProperty('status') && error.status === 200) {
                this.reset();
                this.getBooks();
            }
            console.log(error);
        });
    }
    deleteBook(bookId: string) {
        this.bookService.deleteBook(bookId)
        .subscribe((response) => {
            console.log(response);
            this.getBooks();
        }, (error) => {
            this.getBooks();
            console.log(error);
        });
    }
}

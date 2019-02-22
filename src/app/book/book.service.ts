import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Book } from './book';

@Injectable()
export class BookService {
    private apiURL = 'http://localhost:8080/bookapi/api/book';
    constructor(private http: HttpClient) { }
    // Uses http.get() to load data from a single API endpoint
    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.apiURL)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    addBook(book: Book) {
        const body = JSON.stringify(book);
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        if (book.id) {
            return this.http.put(this.apiURL + '/' + book.id, body, httpOptions);
        } else {
            return this.http.post(this.apiURL, body, httpOptions);
        }
    }
    getBookById(bookId: string): Observable<Book> {
        return this.http.get<Book>(this.apiURL + '/' + bookId)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }
    deleteBook(bookId: string) {
        return this.http.delete(this.apiURL + '/' + bookId);
    }
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}

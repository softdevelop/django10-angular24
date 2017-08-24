import { Component }            from '@angular/core';
import { AuthorService }        from "../../../services/authors/author.services";
import { AuthorRemoveComponent } from "../remove/AuthorRemoveComponent";
//import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { IAuthor }              from "../../../interfaces/IAuthor";
import { Router }               from '@angular/router';

@Component({
    selector: 'authors',
    //templateUrl: './index.html',
    template: require('./index.html'),
    styleUrls: ['/css/authors/list.css'],
    //styles: require('/components/authors/list/list.css')
    //styles: [require('./list.css')],
})

export class AuthorListComponent
{
    authors: IAuthor[];
    selectedAuthor: IAuthor;
	errorMessage: string;
    constructor(
        private router: Router, 
        private _api: AuthorService
    ) {
        //this.authors = this._api.authors$;
        //this._api.getAuthors();
    }

    ngOnInit(): void {
        this.getAuthors();
    }

    getAuthors(): void {
        this._api
            .getAuthors()
            .then(authors => {
                this.authors = authors;
            });
    }

    onSelect(author: IAuthor): void {
        this.selectedAuthor = author;
    }

    onView(author: IAuthor) {
        this.router.navigate(['/author', author.id]);
    }
}

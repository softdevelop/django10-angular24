import { Component, OnInit} from '@angular/core';
import { AuthorService} from "../../../services/authors/author.services";
import { Params, ActivatedRoute, Router } from "@angular/router";
import { AuthorFormComponent } from '../form/AuthorFormComponent';
import { Location }               from '@angular/common';
import {IAuthor} from "../../../interfaces/IAuthor";

@Component({
    selector: 'author',
    //templateUrl: './components/authors/edit/index.html',
    template: require('./index.html')
})

export class AuthorEditComponent
{
    author: Object;
    sub: Object;

    constructor(
        private _api: AuthorService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];

            this._api.getAuthor(id)
                .subscribe(
                    (author:IAuthor) => {this.author = author; },
                    //error =>  this.errorMessage = <any>error
                    (error:string) =>  "Error"
                );
        });
    }

}

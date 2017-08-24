import {Component, OnInit} from '@angular/core';
//import {Params, ActivatedRoute, ROUTER_DIRECTIVES, Router} from "@angular/router";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../../services/authors/author.services";
import {IAuthor} from "../../../interfaces/IAuthor";
import { Location }               from '@angular/common';

@Component({
    selector: 'author',
    //templateUrl: './components/authors/detail/index.html',
    template: require('./index.html')
})

export class AuthorDetailComponent implements OnInit {
    private sub:any;
    private author: IAuthor;

    constructor(
        private _api: AuthorService,
        private route: ActivatedRoute,
        private _route: Router,
        //private _params: RouteParams
        private location: Location
    ) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];

            this._api.getAuthor(id)
                .subscribe(
                    (author:IAuthor) => {this.author = author; console.log(this.author) },
                    //error =>  this.errorMessage = <any>error
                    (error:string) =>  "Error"
                );
        });


        /*
        this.route.params.forEach((params: Params) => {
          let id = +params['id'];
          this._api.getAuthor(id)
            .subscribe(
                author => {this.author = author; console.log(author); },
                error =>  this.errorMessage = <any>error
            );
        });
        /*
        this._api.getAuthor(_params.get("id")).then(
            (res: any) => {
                console.log(res.author);
                this.author = res.author;
            },
            (error) => {
                console.error(error);
            }
        )
        */
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }

    onList() {
        this._route.navigate(['/authors']);
    }
}

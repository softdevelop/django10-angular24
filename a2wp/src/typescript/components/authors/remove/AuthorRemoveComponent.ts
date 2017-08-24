import {Component, Input} from '@angular/core';
import {AuthorService} from "../../../services/authors/author.services";
//import {ROUTER_DIRECTIVES} from '@angular/router';
import {IAuthor} from "../../../interfaces/IAuthor";

declare var $:any;

@Component({
    selector: 'author-remove',
    //templateUrl: './components/authors/remove/index.html',
    template: require('./index.html'),
    //directives: [ROUTER_DIRECTIVES]
})

export class AuthorRemoveComponent
{
    @Input() author: IAuthor;
    //@Input() selectedAuthor: IAuthor;
    constructor(private _api: AuthorService)
    {

    }

    remove(id: number)
    {
        this._api.deleteAuthor(id);
        $("#remove-author").modal("hide");
        $("#item-"+id).remove();
    }
}

import {Component, Input} from '@angular/core';
//import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Router} from '@angular/router';
import {AuthorService} from "../../../services/authors/author.services";
import {IAuthor} from "../../../interfaces/IAuthor";

@Component({
    selector: 'authors-form',
    //templateUrl: './components/authors/form/authors-form.html',
    template: require('./authors-form.html'),
    //directives: [ROUTER_DIRECTIVES]
})

export class AuthorFormComponent {
    @Input('author') author: IAuthor;
    //author = new IAuthor();
    @Input('isUpdate') isUpdate: boolean = false;
    @Input('action') action: string;
    errors: Array<Object> = [];

    constructor(private _router: Router, private _api: AuthorService){

    }

    processAuthor(author:IAuthor): void {
        !this.isUpdate ? this.save(author) : this.update(author);
    }

    save(author:IAuthor)
    {
        let author_string = this._authorString(author);
        /* Promise - service: createAuthor */
        /*
        this._api.createAuthor(author_string).then(
            (res:any) => {
                this._router.navigate(['/authors']);
            },
            (error:any) => {
                if(error.status === 422) //código de respuesta de laravel cuando falla la validación
                {
                    this.errors = [];
                    let errors = error.json();
                    for(var key in errors) {
                         this.errors.push(errors[key]);
                    }
                }
            }
        );
        */
        this._api.createAuthor(author_string)
            .subscribe(
                (res:any) => {
                    this._router.navigate(['/authors']);
                },
                (error:any) =>  this.errors = <any>error
            );
    }

    update(author:IAuthor)
    {
        let author_string = this._authorString(author);

        this._api.updateAuthor(author_string, author.id).then(
            (res:any) => {
                this._router.navigate(['/authors']);
            },
            (error:any) => {
                if(error.status === 422)//código de respuesta de laravel cuando falla la validación
                {
                    this.errors = [];
                    let errors = error.json();
                    for(var key in errors) {
                        this.errors.push(errors[key]);
                    }
                }
            }
        );
    }

    private _authorString(author:IAuthor): string{
        return "&id="+author.id+"&name="+author.name;
    }
}

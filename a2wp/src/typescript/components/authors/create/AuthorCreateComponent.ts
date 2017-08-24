import {Component} from '@angular/core';
/*import {AuthorService} from "../../../services/authors/author.services";*/
import {AuthorFormComponent} from '../form/AuthorFormComponent';

@Component({
    selector: 'author-create',
    //templateUrl: './components/authors/create/index.html',
    template: require('./index.html')
})

export class AuthorCreateComponent
{
    author: Object = {
        name: '',
    };
}

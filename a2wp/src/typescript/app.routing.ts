import { Routes, RouterModule }     from '@angular/router';
import { PageNotFoundComponent }    from "./components/page-not-found/page-not-found.component";
import { FirstComponent }           from "./components/first/first.component";
import { SecondComponent }          from "./components/second/second.component";
import { AuthorListComponent }      from "./components/authors/list/AuthorListComponent";
import { AuthorDetailComponent }    from "./components/authors/detail/AuthorDetailComponent";
import { AuthorEditComponent }      from "./components/authors/edit/AuthorEditComponent";
import { AuthorCreateComponent }    from "./components/authors/create/AuthorCreateComponent";

export const routes: Routes = [
    {
        path: '',
        component: FirstComponent
    },
    {
        path: 'edit',
        component: SecondComponent
    },
    {
        path:'authors',
        //name: 'Authors',
        component: AuthorListComponent
    },
    {
        path:'author/create',
        //name: 'AuthorCreate',
        component: AuthorCreateComponent
    },
    {   
        path:'author/:id',
        //name: 'AuthorDetail',
        component: AuthorDetailComponent
    },
    {
        path:'author/edit/:id',
        //name: 'AuthorEdit', 
        component: AuthorEditComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

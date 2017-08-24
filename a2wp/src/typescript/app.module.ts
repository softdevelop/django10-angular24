import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { NgModule }         from '@angular/core';
import { RouterModule }     from '@angular/router';

import { routes }           from './app.routing';

import { AppComponent }             from './app.component';
import { PageNotFoundComponent }    from "./components/page-not-found/page-not-found.component";
import { FirstComponent }           from "./components/first/first.component";
import { SecondComponent }          from "./components/second/second.component";
import { ProgressBar }              from "./components/ui/progress-bar/progress-bar.component";

import { AuthorListComponent }      from "./components/authors/list/AuthorListComponent";
import { AuthorEditComponent }      from "./components/authors/edit/AuthorEditComponent";
import { AuthorCreateComponent }    from "./components/authors/create/AuthorCreateComponent";
import { AuthorDetailComponent }    from "./components/authors/detail/AuthorDetailComponent";
import { AuthorFormComponent}       from "./components/authors/form/AuthorFormComponent";
import { AuthorRemoveComponent }    from "./components/authors/remove/AuthorRemoveComponent";

import { FileUploadService }        from "./services/file-upload/file-upload.service";
import { AuthorService }            from "./services/authors/author.services";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        FirstComponent,
        SecondComponent,
        AuthorListComponent,
        AuthorRemoveComponent,
        AuthorEditComponent,
        AuthorCreateComponent,
        AuthorDetailComponent,
        AuthorFormComponent,
        ProgressBar
    ],
    providers: [
        FileUploadService,
        AuthorService
    ],
    bootstrap:[
        AppComponent
    ]
})
export class AppModule {}

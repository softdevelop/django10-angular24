import { Http, Headers, Response, RequestOptions }  from "@angular/http"
import { Injectable }               from "@angular/core"
import { IAuthor }                  from "../../interfaces/IAuthor"
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Observable }               from 'rxjs/Observable';
import { Observer }                 from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorService
{
    /*
    apiUrl: string = "http://localhost:8000/api/authors/";
    */
    //apiUrl: string = "http://crudangular2.com/api/authors";
    //private apiUrl = 'http://sirfak.l53a2.com/api/authors';  // URL to web API
    private apiUrl = '/api/author';  // URL to web API
    /*
    private headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    });
    */
    headers: Headers = new Headers;
    options: RequestOptions;
    authors$: Observable<IAuthor[]>;
    private _authorsObserver: Observer<IAuthor[]>;
    private _dataStore: {
        authors: IAuthor[]
    };

    constructor(private _http: Http)
    {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
        this.headers.append('token', 'abc'); 
        this.options = new RequestOptions({ headers: this.headers });

        this.authors$ = new Observable(observer => this._authorsObserver = observer).share();
        this._dataStore = { authors: [] };
    }

    getAuthors(): Promise<IAuthor[]> {
        /*
        this._http.get(this.apiUrl).map(
            response => response.json()).subscribe(
                data => {
                    console.log(data.authors);
                    return data.authors;
                    //this._dataStore.authors = data.authors;
                    //return data.authors;
                    //this._authorsObserver.next(this._dataStore.authors);
                }, 
                error => console.log('Authors')
            );
        */
		let authorsURL = this.apiUrl + "s";
        return this._http.get(authorsURL, this.options)
            .toPromise()
            .then(response => response.json().data as IAuthor[])
            //.map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let data = res.json();
        return data.authors || { };
    }

    public getAuthor(id:number)
    {
        return this._http.get(this.apiUrl + "/" + id)
            .map(this.extractDetailData)
            .catch(this.handleError);
            /*
            .subscribe(
                res => {
                    console.log("res");
                    console.log(res);
                    let data = res.json();
                    return data.author || { };
                },
                error =>  this.errorMessage = <any>error
            );
            */
    }

    private extractDetailData(res: Response) {
        let author = res.json();
        return author.data || { };
    }


    public createAuthor(author:string)
    {
        /*
        return new Promise((resolve, reject) => {
            this._http.post(this.apiUrl, author, {
                headers: this.headers
            })
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    resolve(res);
                },
                (error:any) => {
                    reject(error);
                }
            );
        })
        */
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        return this._http.post(this.apiUrl+"/add", author, this.options)
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
                        /*
                        .subscribe(
                            (res:any) => {
                                console.log(res);
                            },
                            (error:any) => {
                                console.log(error);
                            }
                        );
                        */
    }

    public updateAuthor(author:string, id:number)
    {
        return new Promise((resolve, reject) => {
            //this._http.patch(this.apiUrl + "/edit", author, {
            this._http.put(this.apiUrl + "/edit", author, {
            //this._http.post(this.apiUrl + "/edit", author, {
                headers: this.headers
            })
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    resolve(res);
                },
                (error:any) => {
                    reject(error);
                }
            );
        })
    }

    public deleteAuthor(id:number)
    {
        this._http.delete(this.apiUrl +"/delete/"+ id, {
        //this._http.get(this.apiUrl +"/delete/"+ id, {
            headers: this.headers
        }).subscribe(response => {
            this._dataStore.authors.forEach((t, i) => {
                if (t.id === id) { this._dataStore.authors.splice(i, 1); }
            });
            this._authorsObserver.next(this._dataStore.authors);
        }, error => console.log('Del a author.'));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

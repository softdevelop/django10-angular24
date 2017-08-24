import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
declare var $:any;

@Injectable()
export class FileUploadService {
    private http: Http;

    constructor (http: Http) {
        this.http = http;
    }

    /**
     * @param requestUrl
     * @returns {Observable<{}>}
     */
    public upload (requestUrl: string, postFiles:Object): Observable<{}> {
        var data = new FormData();
        
        $.each(postFiles, function(key:String, value:String)
        {
            data.append(key, value);
        });
        
        return this.http
            .post(requestUrl, data)
            .map(FileUploadService.extractData);
    }

    /**
     * @param res
     * @returns {any}
     */
    private static extractData (res: Response): any {
        let body = res.json();

        return body.message || {};
    }
}

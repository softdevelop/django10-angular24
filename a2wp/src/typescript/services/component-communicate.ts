import { Injectable }     from '@angular/core';
import { Subject }        from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ComponentCommunicate {
	private pageClassSource = new Subject<any>();
	pageClass$ = this.pageClassSource.asObservable();

	private loginMessageSource = new Subject<any>();
	loginMessage$ = this.loginMessageSource.asObservable();

    sharePageClass(name: string) {
		this.pageClassSource.next(name);
	}

    shareLoginMessage(message: string) {
		this.loginMessageSource.next(message);
	}
}
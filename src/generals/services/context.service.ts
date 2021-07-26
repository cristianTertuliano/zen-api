import { getNamespace } from 'node-request-context';

import { User } from '@core/entity/user/user.entity';
import { Account } from '@core/entity/account/account.entity';

export class ContextService {

	public readonly id: number;
	public request: Request;
	public response: Response;

	constructor(request: Request, response: Response) {
		this.request = request;
		this.response = response;
	}

	public static currentRequestContext(): ContextService {
		const namespace = getNamespace('app.zen');
		return namespace?.get('tid');
	}

	public static currentRequest(): Request {
		const requestContext = ContextService.currentRequestContext();
		return requestContext?.request;
	}

	/*
	public static currentAccount(): Account {
		const requestContext = ContextService.currentRequestContext();
		return requestContext?.request['user'].account;
	}*/

	/*
	public static currentUser(): User {
		const requestContext = ContextService.currentRequestContext();
		return requestContext?.request['user'].user;
	}*/

	public static currentPermissions() {
		/* code */
	}	
}
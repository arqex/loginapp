import {ApiRequester} from './ApiRequester';

export abstract class ApiClientBase {
	abstract requester: ApiRequester;
}

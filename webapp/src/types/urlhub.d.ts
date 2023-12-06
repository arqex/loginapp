declare module 'urlhub' {
	interface UrlhubOptions {
		strategy: UrlhubStrategy,
		initialLocation?: string
	}

	interface UrlhubStrategy {
		init: (options: UrlhubOptions) => void;
		onChange: () => void;
		replace: (UrlhubLocation) => void;
		getLocation: () => UrlhubLocation;
		back: () => void;
	}

	type UrlhubCreator<T> = {
		create: (options: UrlhubOptions) => UrlhubClass<T>;
	}

	export interface UrlhubClass<T> {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		constructor: (options: UrlhubOptions) => void;
		setRoutes: (routes: UrlhubRoute<T>[]) => void;
		/** Start listening to the url changes */
		start(): void;
		/**	Start listening to the url changes */
		stop(): void;
		onBeforeChange(cb: (match: UrlhuLocation<T>) => void): void;
		offBeforeChange(cb: (match: UrlhuLocation<T>) => void): void;
		onChange(cb: (match: UrlhuLocation<T>) => void): void;
		offChange(cb: (match: UrlhuLocation<T>) => void): void;
		push(location: string | Partial<UrlhuLocation<T>>): void;
		replace: (location: string | Partial<UrlhuLocation<T>>) => void;
		back: () => void;
		location: UrlhubLocation<T>;
	}

	export interface UrlhubRoute<T> {
		path: string,
		cb: T,
		children?: UrlhubRoute<T>[]
	}

	export interface UrlhubLocation<T> {
		matches: T[],
		matchIds: string[],
		pathname: string
		search: string,
		query: { [key: string]: string | string[] },
		route: string | false,
		params: { [key: string]: string },
	}

	export type ReactRoute = typeof React.Component | React.FunctionComponent;

	const urlhub: UrlhubCreator<ReactRoute> = require('urlhub');
	const Urlhub: UrlhubClass<ReactRoute> = urlhub.Urlhub;

	export default urlhub;
	export {Urlhub};
}

declare module 'urlhub/hashStrategy' {
	interface UrlhubStrategy {
		init: (options: UrlhubOptions) => void;
		onChange: () => void;
		replace: (UrlhubLocation) => void;
		getLocation: () => UrlhubLocation;
		back: () => void;
	}

	const hashStrategy: UrlhubStrategy = require('urlhub/hashStrategy');
	export default hashStrategy;
}

declare module 'urlhub/nodeStrategy' {
	interface UrlhubStrategy {
		init: (options: UrlhubOptions) => void;
		onChange: () => void;
		replace: (UrlhubLocation) => void;
		getLocation: () => UrlhubLocation;
		back: () => void;
	}

	const nodeStrategy: UrlhubStrategy = require('urlhub/nodeStrategy');
	export default nodeStrategy;
}

declare module 'urlhub/pushStrategy' {
	interface UrlhubStrategy {
		init: (options: UrlhubOptions) => void;
		onChange: () => void;
		replace: (UrlhubLocation) => void;
		getLocation: () => UrlhubLocation;
		back: () => void;
	}

	const pushStrategy: UrlhubStrategy = require('urlhub/pushStrategy');
	export default pushStrategy;
}

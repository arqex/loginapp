declare var global: any;

import {CachedRequest} from '../types';
import {RequestCacher, filterCacheKeys} from './RequestCacher';

const requestCacher = new RequestCacher();
function mockFetch() {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			text: () => Promise.resolve('{"data": "test data"}'),
			headers: [],
		})
	);
}

describe('cachedFetch', () => {
	beforeEach(() => {
		requestCacher.clearCache();
		mockFetch();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should make a request with the first call', async () => {
		const url = 'http://test.com';
		const headers = {};
		const onLoad = jest.fn();

		const res = requestCacher.cachedFetch(url, headers, [], onLoad);

		expect(global.fetch).toHaveBeenCalledWith('http://test.com', {});

		expect(res.isLoading).toBe(true);
		expect(res.response).toBe(undefined);
	});

	it('should not make new requests after the first one', async () => {
		const url = 'http://test.com';
		const headers = {};
		const onLoad = jest.fn();

		const {promise} = requestCacher.cachedFetch(url, headers, [], onLoad);
		await promise;

		const res = requestCacher.cachedFetch(url, headers, [], onLoad);

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(res.isLoading).toBe(false);
		expect(res.response?.data).toEqual({data: 'test data'});
	});

	describe('invalidateCacheResponse', () => {
		it('should mark the cached response as needing refresh', async () => {
			const url = 'http://test.com';
			const headers = {};
			const onLoad = jest.fn();

			const {promise} = requestCacher.cachedFetch(url, headers, [], onLoad);
			await promise;

			requestCacher.invalidateCacheResponse(url);

			const res = requestCacher.cachedFetch(url, headers, [], onLoad);

			expect(global.fetch).toHaveBeenCalledTimes(2);
			expect(res.isLoading).toBe(true);
			// Even if it's loading, it should return the stale data anyway
			expect(res.response?.data).toEqual({data: 'test data'});
		});
		it('should mark the cached response as needing refresh when targeting with a wildcard', async () => {
			const url = 'http://test.com';
			const wildcardUrl = '*test*';
			const headers = {};
			const onLoad = jest.fn();

			const {promise} = requestCacher.cachedFetch(url, headers, [], onLoad);
			await promise;

			requestCacher.invalidateCacheResponse(wildcardUrl);

			const res = requestCacher.cachedFetch(url, headers, [], onLoad);

			expect(global.fetch).toHaveBeenCalledTimes(2);
			expect(res.isLoading).toBe(true);
			// Even if it's loading, it should return the stale data anyway
			expect(res.response?.data).toEqual({data: 'test data'});
		});
	});

	describe('Match wildcard (*) cache urls with regex like strings', () => {
		it('should return only the exact key when there are no wildcards', () => {
			expect(filterCacheKeys(fakeCache, '/accounts').length).toBe(1);
		});
		it('should return all cache urls when selecting all with a wildcard', () => {
			expect(filterCacheKeys(fakeCache, '/*').length).toBe(18);
		});
		it('should return all "/accounts" cache urls when selecting "/accounts*"', () => {
			expect(filterCacheKeys(fakeCache, '/accounts*').length).toBe(15);
		});
		it('should return all "id_abc" cache urls when selecting "id_abc/*"', () => {
			expect(filterCacheKeys(fakeCache, '/*/id_abc*').length).toBe(9);
			expect(filterCacheKeys(fakeCache, '/accounts/id_abc*').length).toBe(7);
		});
		it('should return cache urls with "arg1=data1" when selecting "*arg1=data1*"', () => {
			expect(filterCacheKeys(fakeCache, '*arg1=data1*').length).toBe(4);
			expect(filterCacheKeys(fakeCache, '*/owner*arg1=data1*').length).toBe(4);
		});
		it('should return "id_abc" cache urls with "arg1=data1" when selecting "*/id_abc*arg1=data1*"', () => {
			expect(filterCacheKeys(fakeCache, '*/id_abc*arg1=data1*').length).toBe(2);
		});
		it('should work with complicated urls', () => {
			expect(
				filterCacheKeys(
					{
						'https://api.ycbmstaging.com/v1/c909f005-8088-45ab-b50d-c365af7da3df/allocations?fields=id,email,ghost,quantityAllocated':
							{} as CachedRequest<any>,
					},
					'https://api.ycbmstaging.com/v1/c909f005-8088-45ab-b50d-c365af7da3df/allocations?fields=id,email,ghost,quantityAllocated'
				).length
			).toBe(1);
		});
	});
});

const fakeCache = {
	'/accounts': {} as CachedRequest<any>,
	'/accounts/id_abc': {} as CachedRequest<any>,
	'/accounts/id_abc/': {} as CachedRequest<any>,
	'/accounts/id_abc/owner': {} as CachedRequest<any>,
	'/accounts/id_abc/owner?arg1=data1': {} as CachedRequest<any>,
	'/accounts/id_abc/owner?arg1=data1&arg2=data2': {} as CachedRequest<any>,
	'/accounts/id_abc/owner/something': {} as CachedRequest<any>,
	'/accounts/id_abc/owner/another': {} as CachedRequest<any>,
	'/notaccounts': {} as CachedRequest<any>,
	'/notaccounts/id_abc': {} as CachedRequest<any>,
	'/notaccounts/id_abc/': {} as CachedRequest<any>,
	'/accounts/id_123': {} as CachedRequest<any>,
	'/accounts/id_123/': {} as CachedRequest<any>,
	'/accounts/id_123/owner': {} as CachedRequest<any>,
	'/accounts/id_123/owner?arg1=data1': {} as CachedRequest<any>,
	'/accounts/id_123/owner?arg1=data1&arg2=data2': {} as CachedRequest<any>,
	'/accounts/id_123/owner/something': {} as CachedRequest<any>,
	'/accounts/id_123/owner/another': {} as CachedRequest<any>,
};

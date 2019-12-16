import nock from 'nock';
import test from 'ava';
import { Request } from '../../endpoints/model/request';
import getToken from '../../endpoints/get-token';
import { SimpleResponse } from '../simple-response';
import products from '../../endpoints/products';

test('should succeed when valid get by ids request', async t => {
  const req: Request = {
    headers: {
      'x-auth-id': 'myId',
      'x-auth-secret': 'mySecret',
      endpoint: 'http://example1.com'
    },
    query: {
      ids: [ 1 ],
      site_id: 'mysite'
    }
  };

  setUpMockServers('mysite', [ {
        id: 1,
        name: {
          default: 'simple'
        },
        image: {abs_url: 'simple-cat.jpg'}
      } ],
      200,
      200,
      'http://example1.com');

  const res = new SimpleResponse();
  const subject = new products();
  await subject.find(req, res);

  t.is(res.code, 200)
});

test('should fail when unable to get token when finding by id', async t => {
  const req: Request = {
    headers: {
      'x-auth-id': 'myId',
      'x-auth-secret': 'mySecret',
      endpoint: 'http://example1.com'
    },
    query: {
      ids: [ 1 ],
      site_id: 'mysite'
    }
  };

  setUpMockServers('mysite', [ {
        id: 1,
        name: {
          default: 'simple'
        },
        image: {abs_url: 'simple-cat.jpg'}
      } ], 403,
      200,
      'http://example2.com');

  const res = new SimpleResponse();
  const subject = new products();
  await subject.find(req, res);

  t.is(res.code, 500);
  t.is(res.body.code, 'TOKEN_ERROR');
});

test('find products by Id should fail when sfcc returns 500', async t => {
  const req: Request = {
    headers: {
      'x-auth-id': 'myId',
      'x-auth-secret': 'mySecret',
      endpoint: 'http://example.com'
    },
    query: {
      ids: [ 1 ],
      site_id: 'mysite'
    }
  };

  setUpMockServers('mysite', [ {
        id: 1,
        name: {
          default: 'simple'
        },
        image: {abs_url: 'simple-cat.jpg'}
      } ],
      200,
      504,
      'http://example.com');

  const res = new SimpleResponse();
  const subject = new products();
  await subject.find(req, res);

  t.is(res.code, 500);
  t.is(res.body.code, 'PRODUCT_SEARCH_ERROR');
});

function setUpMockServers(
    siteId: string,
    results: any[],
    tokenCode: number = 200,
    sfccCode: number = 200,
    serverPath: string) {
  nock('https://account.demandware.com')
      .post('/dw/oauth2/access_token')
      .reply(tokenCode, {
        access_token: 'myToken',
        expires_in: 2303208
      });

  nock(serverPath)
      .post(`/s/-/dw/data/v19_10/product_search?site_id=${ siteId }`)
      .reply(sfccCode, {
        hits: results,
        total: results.length
      });

}

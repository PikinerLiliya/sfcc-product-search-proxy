const request = require('request');
const _ = require('lodash');
const getToken = require('./get-token');
const config = require('../config');
const logger = require("../logging/debug-logger").getLogger();
const axios = require('axios');

const parseCategories = (data) => {
  return data.map(({id}) => {
    return {
      id,
      name: id.toLowerCase().split('_').join(' ')
    }
  })
};

const getRequest = async (token, uri) => {
  const {data} = await axios.get(uri, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return data.data;
};

async function getCategories(req, res) {

  return new Promise(async (resolve) => {
    let token;
    try {
      token = await getToken(req, res);
      if (!token) {
        return resolve();
      }
    } catch (e) {
      return resolve();
    }

    try {
      const endpoint = _.trimEnd(req.headers.endpoint, '/');
      const rejectUnauthorized = !config.isDev;
      const uri = endpoint + config.apiPath + `/catalogs/${req.params.id}/categories`;
      await request.get({
          rejectUnauthorized,
          url: uri,
          headers: {
            Authorization: 'Bearer ' + token
          }
        },
        async (err, response, body) => {
          if (err || response.statusCode !== 200) {
            res.status(500).json({code: 'CATEGORIES_SEARCH_ERROR', message: 'Error searching for categories'});
            logger.error('none 200 response from sfcc get categories.', err);
            return resolve();
          }

          const {data = [], total, next} = JSON.parse(body);

          let result = [];

          result = result.concat(data);

          for (let i = 1; i < Math.ceil(total / 25); i++) {
            const data = await getRequest(token, `${uri}?count=25&start=${i * 25}`);
            result = result.concat(data);
          }

          const categories = parseCategories(result);

          categories.splice(categories.indexOf({
            id: "root",
            name: "root"
          }), 1);

          res.status(200).json({items: categories});
          return resolve()
        });
    } catch (error) {
      logger.error('An unkown error occured', error);
      res.status(500).json({code: 'UNKNOWN', message: 'An unknown error occured'});
      return resolve();
    }
  });
}

module.exports = getCategories;

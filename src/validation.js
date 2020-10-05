const joi = require('joi');

const headers = {
  'x-auth-id': joi.string().required(),
  'x-auth-secret': joi.string().required(),
  'content-type': joi.string().equal('application/json').required(),
  endpoint: joi.string().uri().trim().required(),
};

module.exports = {

  productSearch: {
    headers,
    body: {
      site_id: joi.string().trim().required(),
      search_text: joi.string().trim().required(),
      catalog_id: joi.string().trim().optional(),
      category_id: joi.string().trim().optional(),
      type: {
        _type: joi.string().trim().optional(),
        item: joi.boolean().optional(),
        set: joi.boolean().optional(),
        bundle: joi.boolean().optional(),
        master: joi.boolean().optional(),
        part_of_product_set: joi.boolean().optional(),
        bundled: joi.boolean().optional(),
        variant: joi.boolean().optional(),
        variation_group: joi.boolean().optional(),
        option: joi.boolean().optional(),
        retail_set: joi.boolean().optional(),
        part_of_retail_set: joi.boolean().optional()
    },
      page: joi.number().integer().required()
    }
  },
  products: {
    headers,
    query: {
      ids: joi.array().items(joi.string()).required(),
      site_id: joi.string().trim().required()
    }
  },
  categories: {
    headers,
    query: {
    }
  }
}

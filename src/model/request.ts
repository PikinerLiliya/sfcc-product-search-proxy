export interface Request {
  headers: {
    'x-auth-id': string,
    'x-auth-secret': string,
    endpoint: string
  },
  body?: Body,
  query?: Query
}

interface Type {
    _type?: string,
    item?: boolean,
    set?: boolean,
    bundle?: boolean,
    master?: boolean,
    part_of_product_set?: boolean,
    bundled?: boolean,
    variant?: boolean,
    variation_group?: boolean,
    option?: boolean,
    retail_set?: boolean,
    part_of_retail_set?: boolean
}

interface Body extends SFCCContext {
  search_text: string,
  catalog_id?: string,
  category_id?: string,
  type?: Type
}

interface Query extends SFCCContext {
  ids: any[]
}

interface SFCCContext {
  site_id: string,
  page?: number
}

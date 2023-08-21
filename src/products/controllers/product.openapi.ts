
export const PRODUCT_REQUEST_BODY = {
  description: 'Product request',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          purchasePrice: { type: 'number', minimum: 0 },
          salePrice: { type: 'number', minimum: 0 },
          categoryId: { type: 'number' },
        },
      },
    },
  },
};

const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    purchasePrice: { type: 'number', minimum: 0 },
    salePrice: { type: 'number', minimum: 0 },
    stockQuantity: { type: 'number', minimum: 0 },
    categoryId: { type: 'number' },
    companyId: { type: 'string', format: 'uuid' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    deletedAt: { type: 'string', format: 'date-time' },
    isDeleted: { type: 'boolean', default: false },
  },
};

export const PRODUCT_RESPONSE = {
  description: 'Product response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          data: productSchema,
        },
      },
    },
  },
};

export const GET_ALL_PRODUCTS_RESPONSE = {
  description: 'Get all products response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: productSchema,
          },
        },
      },
    },
  },
};

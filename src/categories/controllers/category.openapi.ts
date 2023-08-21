const categorySchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    companyId: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
};

export const CREATE_CATEGORY_RESPONSE = {
  description: 'Category model instance',
  content: {
    'application/json': {
      schema: categorySchema,
    },
  },
};

export const CREATE_CATEGORY_REQUEST_BODY = {
  description: 'Category model instance',
  required: true,
  content: {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  },
};

export const GET_ALL_CATEGORIES_RESPONSE = {
  description: 'Category model instance',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: categorySchema,
          },
        },
      },
    },
  },
};

export const STOCK_REQUEST_BODY = {
  description: 'Stock request',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          newStock: { type: 'number', minimum: 1 },
        },
      },
    },
  },
};

export const STOCK_REPORT_RESPONSE = {
  description: 'Stock report',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'number' },
                productName: { type: 'string' },
                categoryId: { type: 'number' },
                categoryName: { type: 'string' },
                stock: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },
};

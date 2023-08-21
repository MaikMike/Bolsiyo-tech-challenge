export const LOGIN_REQUEST_BODY = {
  description: 'Login',
  'application/json': {
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  },
};

export const LOGIN_RESPONSE = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

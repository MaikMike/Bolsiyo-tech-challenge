import { ResponseObject } from '@loopback/rest';

export const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/text': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
};

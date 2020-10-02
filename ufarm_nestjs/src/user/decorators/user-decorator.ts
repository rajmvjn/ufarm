import { ApiBody } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ApiUser = (fileName: string): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },

        name: {
          type: 'string',
          format: 'text',
          default: '',
        },
        phone: {
          type: 'string',
          format: 'text',
          default: '',
        },
        email: {
          type: 'string',
          format: 'text',
          default: '',
        },
        password: {
          type: 'string',
          format: 'text',
          default: '',
        },
        avatar: {
          type: 'string',
          format: 'text',
        },
        address: {
          type: 'string',
          format: 'text',
        },
        housename: {
          type: 'string',
          format: 'text',
        },
        pincode: {
          type: 'string',
          format: 'text',
        },

        status: {
          type: 'boolean',
          default: true,
        },
        sell: {
          type: 'boolean',
          default: false,
        },
        admin: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })(target, propertyKey, descriptor);
};

import { ApiBody } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ApiCategory = (fileName: string): MethodDecorator => (
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
        cat_id: {
          type: 'string',
          format: 'text',
          default: `CAT${Math.round(Date.now() + Math.random())
            .toString()
            .substr(9)}`,
        },
        name: {
          type: 'string',
          format: 'text',
          default: 'Fruits',
        },
        description: {
          type: 'string',
          format: 'text',
          default: 'This is test description',
        },
        img_url: {
          type: 'string',
          format: 'text',
        },
        status: {
          type: 'boolean',
          default: true,
        },
      },
    },
  })(target, propertyKey, descriptor);
};

import { ApiBody } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ApiSellProduct = (fileName: string): MethodDecorator => (
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
        farm_id: {
          type: 'string',
          format: 'text',
        },
        name: {
          type: 'string',
          format: 'text',
          default: 'Fruits',
        },
        category_id: {
          type: 'string',
          format: 'text',
          default: 'Flora',
        },

        description: {
          type: 'string',
          format: 'text',
          default: 'This is test description',
        },
        image_url: {
          type: 'string',
          format: 'text',
        },
        date_created: {
          type: 'date',
        },
        quantity_available: {
          type: 'string',
          format: 'text',
        },
        sell_user_id: {
          type: 'string',
          format: 'text',
        },
        unit: {
          type: 'string',
          format: 'text',
        },
        offer_price_percentage: {
          type: 'number',
        },
        status: {
          type: 'boolean',
          default: true,
        },
      },
    },
  })(target, propertyKey, descriptor);
};

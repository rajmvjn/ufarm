import { ApiBody } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ApiFarmProduct = (fileName: string): MethodDecorator => (
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
          default: `FARM_${Math.round(Date.now() + Math.random())
            .toString()
            .substr(9)}`,
        },
        name: {
          type: 'string',
          format: 'text',
          default: 'Fruits',
        },
        scientific_name: {
          type: 'string',
          format: 'text',
          default: 'Flora',
        },
        cat_id: {
          type: 'string',
          format: 'text',
        },
        how_to_farm: {
          type: 'string',
          format: 'text',
          default: 'How to farm sample description',
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
        date: {
          type: 'date',
        },
        nutrition_fact_image_url: {
          type: 'string',
          format: 'text',
        },
        base_price: {
          type: 'number',
        },
        unit: {
          type: 'string',
          format: 'text',
        },
        allowed_price_diff: {
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

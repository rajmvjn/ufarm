import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { constants } from './constants';

@Controller()
@ApiTags('Images')
export class AppController {
  /**
   * Function to get the product image
   */
  @Get('images/:imgpath')
  public getImage(@Param('imgpath') image: string, @Res() res: Response): void {
    return res.sendFile(image, { root: `./${constants.IMAGE_FOLDER}` });
  }
}

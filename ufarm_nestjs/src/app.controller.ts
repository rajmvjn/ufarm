import { Controller, Get, Param, Res, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import * as admin from 'firebase-admin';

import { AppService } from './app.service';

@Controller()
@ApiTags('Images')
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Function to get the product image
   */
  @Get('images/:imgpath')
  public async getImage(
    @Param('imgpath') imageName: string,
    @Res() res: Response,
  ): Promise<any> {
    const storageBucket = admin.storage().bucket();
    const bucketFile = storageBucket.file(imageName);
    return this.appService.getImageUrl(bucketFile).then(
      signedUrls => {
        Logger.log('Inside getImageUrl', JSON.stringify(signedUrls));
        const [imageUrl] = signedUrls;
        res.send(imageUrl);
      },
      error => {
        Logger.log('Inside getImageUrl function error', JSON.stringify(error));
      },
    );
  }
}

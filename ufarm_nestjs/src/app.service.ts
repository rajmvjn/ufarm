import { Injectable } from '@nestjs/common';

import { constants } from './constants';

@Injectable()
export class AppService {
  /**
   * Function to get the signed image url for public access
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async getImageUrl(bucketFile: any): Promise<any> {
    return await bucketFile.getSignedUrl({
      action: constants.SIGNED_URL_ACTION,
      expires: constants.SIGNED_URL_EXPIRES,
    });
  }
}

import * as config from '../../config/configuration';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const imageFileFilter = (req: Request, file: any, cb: any): any => {
  console.log('file', file);
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const editFileName = (file: any): string => {
  const fileExtName = file.originalname;
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return `${randomName}${fileExtName}`;
};

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const uploadImageToStorage = (file, bucket): any => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }

    const fileUpload = bucket.file(file.filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobStream.on('error', error => {
      reject(`Unable to upload at the moment. ${JSON.stringify(error)}`);
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `${config.default().FIREBASE_STORAGE_URL}/${bucket.name}/${
        fileUpload.name
      }`;

      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

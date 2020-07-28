// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const imageFileFilter = (req: Request, file: any, cb: any): any => {
  console.log('file', file);
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const editFileName = (req: Request, file: any, cb: any): any => {
  const fileExtName = file.originalname;
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${randomName}${fileExtName}`);
};

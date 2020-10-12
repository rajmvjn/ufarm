// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  googleMapsAPIKey: "AIzaSyDHnb1QOpjL_fQyG7ctc_qWYCA-3Bt2jUw",
  BaseURL: "http://localhost:3000/api/",
  //BaseURL: "https://ufarm-app.herokuapp.com/api/",
  ImagesURL: "http://localhost:3000/api/images/",
  //ImagesURL: "https://ufarm-app.herokuapp.com/api/images/",

  logger: {
    log: true,
    error: true,
    warn: true,
    debug: true,
    trace: true,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

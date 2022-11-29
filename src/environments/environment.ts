// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'project-fods',
    appId: '1:474745128496:web:752deea602858385928ff5',
    storageBucket: 'project-fods.appspot.com',
    locationId: 'asia-south1',
    apiKey: 'AIzaSyDw7P2NaCXpvr-e5sXi4cw5ErA0ny7HMeE',
    authDomain: 'project-fods.firebaseapp.com',
    messagingSenderId: '474745128496',
  },
  production: false,
  auth_endpoint: 'http://localhost:3000/v1/auth',
  business_endpoint: 'http://localhost:3000/v1/business',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

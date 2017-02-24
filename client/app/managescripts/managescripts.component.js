'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './managescripts.routes';

export class ManagescriptsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('pythonReaderApp.managescripts', [uiRouter])
  .config(routes)
  .component('managescripts', {
    template: require('./managescripts.html'),
    controller: ManagescriptsComponent,
    controllerAs: 'managescriptsCtrl'
  })
  .name;

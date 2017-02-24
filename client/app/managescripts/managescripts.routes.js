'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('managescripts', {
      url: '/managescripts',
      template: '<managescripts></managescripts>'
    });
}

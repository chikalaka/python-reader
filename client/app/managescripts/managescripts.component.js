'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './managescripts.routes';

export class ManagescriptsComponent {

  scripts = [];
  newScript = {scriptName: '', scriptCode: '', isWorking: 'true'};

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit(){
    this.$http.get('/api/scripts')
      .then(response => {
        this.scripts = response.data;
        console.log(this.scripts);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  addScript(){
    this.$http.post('/api/scripts', this.newScript)
    .then((response) => {
      this.newScript = {scriptName: '', scriptCode: '', isWorking: 'true'};
    })
    .catch(error => {
      console.log('error: ', error);
    });
  }

  removeScript(){
    let selectedId = this.removeScriptSelection;
    this.$http.delete('/api/scripts/' + selectedId)
    .then(response => {
      console.log('removeScript(), script successfuly deleted');
    })
    .catch(error => {
      console.log('error: ', error);
    });
  }

  executeScript(){
    console.log(this.executeScriptSelection);
  }
}

export default angular.module('pythonReaderApp.managescripts', [uiRouter])
  .config(routes)
  .component('managescripts', {
    template: require('./managescripts.html'),
    controller: ManagescriptsComponent
  })
  .name;

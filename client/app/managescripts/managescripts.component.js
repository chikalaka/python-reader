'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './managescripts.routes';

// import {spawn} from 'child_process';

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
      console.log(response.data._id);
      this.newScript._id = response.data._id;
      this.scripts.push(this.newScript);
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
      this.scripts.splice(this.getIndexOfId(selectedId), 1);
    })
    .catch(error => {
      console.log('error: ', error);
    });
  }

  executeScript(){
    let scriptCode = this.getObjectFromId(this.executeScriptSelection).scriptCode;
    console.log(scriptCode);
    // var process = spawn('python',['../../scriptsFiles/script.py']);

    // var py = spawn('python', ["compute_input.py"]);
    // var data = [1,2,3,4,5,6,7,8,9],
    // dataString = '';
    //
    // py.stdout.on('data', function(data){
    //   dataString += data.toString();
    // });
    // py.stdout.on('end', function(){
    //   console.log('Sum of numbers=',dataString);
    // });
    // py.stdin.write(JSON.stringify(data));
    // py.stdin.end();
  }

  getIndexOfId(id){
    let i = 0;
    let len = this.scripts.length;
    for (i = 0; i < len; ++i){
      if (this.scripts[i]._id === id){
        return i;
      }
    }
    return -1;
  }

  getObjectFromId(id){
    return this.scripts[this.getIndexOfId(id)];
  }

}

export default angular.module('pythonReaderApp.managescripts', [uiRouter])
  .config(routes)
  .component('managescripts', {
    template: require('./managescripts.html'),
    controller: ManagescriptsComponent
  })
  .name;

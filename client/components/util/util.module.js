'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('pythonReaderApp.util', [])
  .factory('Util', UtilService)
  .name;

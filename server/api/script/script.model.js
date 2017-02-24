'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './script.events';

var ScriptSchema = new mongoose.Schema({
  scriptName: String,
  scriptCode: String,
  isWorking: Boolean
});

registerEvents(ScriptSchema);
export default mongoose.model('Script', ScriptSchema);

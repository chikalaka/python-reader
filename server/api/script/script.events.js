/**
 * Script model events
 */

'use strict';

import {EventEmitter} from 'events';
var ScriptEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScriptEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Script) {
  for(var e in events) {
    let event = events[e];
    Script.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ScriptEvents.emit(event + ':' + doc._id, doc);
    ScriptEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ScriptEvents;

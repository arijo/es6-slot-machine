import { assert } from 'chai';
import EventEmitter from '../lib/event';

describe('EventEmitter', function() {

  class Mock extends EventEmitter {};
  let mock = new Mock;

  it('should call the registered handler when an event is emitted', function() {
    mock.on('change', ev => assert.isOk(true, 'the event was triggered')); 
    mock.emit('change');
  });

  it('should call the registered handler passing the correct data when an event is emitted', function() {
    mock.on('change', (ev, data) => assert.isOk(data.bonus, 'the event was triggered with the correct data')); 
    mock.emit('change', {bonus: true});
  });
});

import { assert } from 'chai';
import Model from '../lib/model';

describe('Model', function() {

  class MockTransport {
 
    onreadystatechange() {}

    _onreadystatechange() {
      this.readyState = XMLHttpRequest.DONE;
      this.status = 200;
      this.responseText = JSON.stringify({bonus: true});
      this.onreadystatechange();
    }

    open() {}
    
    send() {
      setTimeout(() => this._onreadystatechange(), 1);
    } 
  };

  it('should call the registered handler when an event is emitted', function(done) {
    let outcomes = new Model({findAll: 'GET /outcomes', transport: MockTransport});
    outcomes.on('load', (ev, outcomes) => {
      assert.isOk(outcomes.bonus, 'data was correctly fetched');
      done();
    });
    outcomes.findAll();
  });
});

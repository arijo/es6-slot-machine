import EventEmitter from './event';

export default class Model extends EventEmitter {

  constructor(options) {
    super(options);
    let parts = options.findAll.split(' ');
    this.method = parts[0];
    this.url = parts[1];
    this.transport = options.transport || XMLHttpRequest;
  }

  findAll(params) {
    let req = new this.transport;
    req.onreadystatechange = 
      () => this._onreadystatechange(req);
    req.open(this.method, 
      this.url + (params ? '?win=' + params.win : ''));
    req.send();
  }

  _onreadystatechange(req) {
    // TODO: HANDLE NETWORK AND PARSING ERRORS
    if(req.readyState === XMLHttpRequest.DONE) {
      if(req.status === 200) {
        this.emit('load', JSON.parse(req.responseText));
      }
    }
  }
}

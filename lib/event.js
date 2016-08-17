export default class EventEmitter {

  constructor() {
    this.events = {};
  }

  on(ev, handler) {
    let handlers = this.events[ev];
    if(!handlers) {
      return this.events[ev] = [handler]; 
    }
    this.events[ev].push(handler);
  }

  emit(ev, data) {
    let handlers = this.events[ev];
    if(!handlers) return;
    handlers.forEach(function(handler) {
      handler(ev, data);
    });
  }
}

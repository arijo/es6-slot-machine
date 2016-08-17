import Model from '../../lib/model';
import template from '../../lib/template';
import gameHTML from './views/game';
import headerHTML from './views/header';
import contentHTML from './views/content';

export default class Game {

  constructor(el, options) {
    this.el = el;
    this.el.innerHTML = template(gameHTML).render();

    this.headerEl = this.el.querySelector('header');
    this.contentEl = this.el.querySelector('.content');
    this.goBtnEl = this.el.querySelector('.go');
    this.goBtnEl.addEventListener('click', 
      ev => this.go(), false);

    this.outcomes = new Model({
      findAll: 'GET /outcomes'
    });
    this.outcomes.on('load', 
      (ev, outcomes) => this.update(outcomes));
  }

  update(outcomes) {
    if(outcomes.bonus) {
      this.outcomes.findAll({win: outcomes.win});  
    }
    this._update(outcomes);
  }

  _update(outcomes) {
    this.headerEl.innerHTML = 
      template(headerHTML).render(outcomes);
    this.contentEl.innerHTML = 
      template(contentHTML).render(outcomes); 
  }

  go() {
    this.outcomes.findAll();
  }
}

import { assert } from 'chai';
import { leftTrim } from '../lib/string'
import template from '../lib/template'; 

describe('Templating function', function() {

  describe('#template()', function() {

    const staticTpl = '<h1>Hello World!</h1>';
    const dynamicTpl = '<h1><% this.message %></h1>';
    const loopTpl = leftTrim`
      <ul>
        <% for(var i=0; i<this.items.length; i++) { %>
          <li><% this.items[i] %></li>
        <% } %>
      </ul>`;
    const staticLoopTpl = '<ul><li>ITEM_1</li><li>ITEM_2</li><li>ITEM_3</li></ul>';

    it('should return the correct result given a static template with no context data', function() {
      assert.equal(staticTpl, template(staticTpl).render({}));
    });

    it('should return correct result for dynamic template given some context data', function() {
      assert.equal(staticTpl, template(dynamicTpl).render({ message: 'Hello World!' }));
    }); 

    it('should return correct result for dynamic template with for loop when given a list of items as context', function() {
      assert.equal(staticLoopTpl, template(loopTpl).render({ items: ['ITEM_1', 'ITEM_2', 'ITEM_3'] }));
    });
  });
});

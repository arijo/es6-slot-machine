let contentHTML = `
  <ul class='symbols'>
  <% for(var i=0; i<this.symbols.length; i++) { %>
    <li class='symbol'><img src='/img/<% this.symbols[i] %>' /></li>
  <% } %>
  </ul>
`;

export default contentHTML;

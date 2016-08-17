let headerHTML = `
  <h1 class='default'><% this.message.default %></h1>
  <%if(this.message.bonus) { %>
    <h1 class='bonus'><% this.message.bonus %></h1>
  <% } %>
`;

export default headerHTML;

function template(html) {
  let re = /<%(.*)%>/g,
      reExp = /(^\s*(if|for|else|switch|case|break|{|})).*/g, 
      code = 'var r=[];\n', 
      cursor = 0, match;
  let add = function(line, js) {
    js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
        (code += line != '' ? 
      'r.push("' + line.replace(/"/g, '\\"').replace(/\n/g, '') + '");\n' : '');
    return add;
  }
  while(match = re.exec(html)) {
    add(html.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(html.substr(cursor, html.length - cursor));
  code += 'return r.join("");';
  return {
    render: function(ctx) {
      return (new Function(code)).apply(ctx);
    }
  }
}

export default template;

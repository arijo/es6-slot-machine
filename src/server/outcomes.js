function _rnd5() {
  return Math.floor(Math.random()*6);
}

function _headers(matches) {
 const headers = {
  0: 'No Win',
  1: 'Small Win',
  2: 'Big Win!'
 } 
 return headers[matches];
}

function _message(symbols) {
 let matches = 0, prev;
 symbols.sort().forEach(function(symbol) {
    if(symbol === prev) matches += 1;
    prev = symbol; 
 });
 return {
  number: matches,
  text: _headers(matches)
 }
}

export default function outcomes(win) {
  let symbols = [];
  for(var i=0; i<3; i++) {
    symbols.push('Symbol_' + _rnd5() + '.png');
  }
  let result = _message(symbols);
  return {
    symbols: symbols,
    win: result.number, 
    message: { 
      default: typeof win == 'undefined' ? result.text : _headers(win),
      bonus: typeof win != 'undefined' ? 'Bonus Trial: ' + result.text : ''
    },
    bonus: _rnd5() > 4,
  }
}

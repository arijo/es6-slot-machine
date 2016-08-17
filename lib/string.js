function leftTrim(strings, ...values) {
  return strings[0].split(/\n/)
    .map(line => line.trim()).join('\n');
}

export default leftTrim;

export {
  leftTrim
}

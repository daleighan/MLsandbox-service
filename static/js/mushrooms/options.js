let key = require('./key.json');

let options = {};

for (var classifier in key) {
  let selections = [];
  for (var label in key[classifier]) {
    selections.push({
      value: key[classifier][label],
      label,
    })
  }
  options[classifier] = selections
}

module.exports = options;
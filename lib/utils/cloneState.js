var _ = require('./tinydash');
var isImmutable = require('./isImmutable');

function cloneState(state) {
  if (isImmutable(state)) {
    return state;
  }

  return _.cloneDeep(state);
}

module.exports = cloneState;
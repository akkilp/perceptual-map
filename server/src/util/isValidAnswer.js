function isFloat(val) {
  const floatRegex = /(^-?\d\d*\.\d\d*$)|(^-?\.\d\d*$)/;
  return floatRegex.test(val);
}

function isInt(val) {
  const intRegex = /^-?[0-9]+$/;
  return intRegex.test(val);
}

const isValid = (strInput, valType, minValue = null, maxValue = null) => {
  let parsed;
  if (valType === "integer") {
    parsed = parseInt(strInput);
    if (!isInt(parsed)) return false;
  } else if (valType === "float") {
    parsed = parseFloat(strInput).toFixed(2);
    if (!isFloat(parsed)) return false;
  } else {
    return false;
  }

  if (toString(minValue)) {
    if (parsed < minValue) {
      return false;
    }
  }

  if (toString(maxValue)) {
    if (parsed > maxValue) {
      return false;
    }
  }
  return true;
};

module.exports = { isValid };

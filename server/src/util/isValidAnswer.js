const isValid = (strInput, valType, minVal=null, maxValue=null) => {
    let parsed;
    if(valType === 'integer'){
      parsed = parseInt(strInput)
    } else if (valType === 'float') {
      parsed = parsefloat(strInput)
    } else {
      return false
    }
    if(!(minValue && parsed>=minValue)){
      return false
    }
    if(!(maxValue && parsed<=maxValue)){
      return false
    }
    return !isNaN(parsed) && parsed.toString() === strInput
  }

  module.exports = {isValid}
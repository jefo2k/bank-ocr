function ocr(str) {
  return false
}

function scanDigit(str) {
  let digitsNonWhiteSpace = [
    {'digit': 0, 'nonWhites': 6, 'uniques': [
      {'index': 4, 'char': ' '}, 
      {'index': 5, 'char': '|'}, 
      {'index': 6, 'char': '|'}]},
    {'digit': 1, 'nonWhites': 2, 'uniques': []},
    {'digit': 2, 'nonWhites': 5, 'uniques': [
      {'index': 3, 'char': ' '}, 
      {'index': 5, 'char': '|'}, 
      {'index': 6, 'char': '|'}, 
      {'index': 8, 'char': ' '}]},
    {'digit': 3, 'nonWhites': 5, 'uniques': [
      {'index': 3, 'char': ' '}, 
      {'index': 5, 'char': '|'}, 
      {'index': 6, 'char': ' '}, 
      {'index': 8, 'char': '|'}]},
    {'digit': 4, 'nonWhites': 4, 'uniques': []},
    {'digit': 5, 'nonWhites': 5, 'uniques': [
      {'index': 3, 'char': '|'}, 
      {'index': 5, 'char': ' '}, 
      {'index': 6, 'char': ' '}, 
      {'index': 8, 'char': '|'}]},
    {'digit': 6, 'nonWhites': 6, 'uniques': [
      {'index': 4, 'char': '_'}, 
      {'index': 5, 'char': ' '}, 
      {'index': 6, 'char': '|'}]},
    {'digit': 7, 'nonWhites': 3, 'uniques': []},
    {'digit': 8, 'nonWhites': 7, 'uniques': []},
    {'digit': 9, 'nonWhites': 6, 'uniques': [
      {'index': 4, 'char': '_'}, 
      {'index': 5, 'char': '|'}, 
      {'index': 6, 'char': ' '}]},
  ]

  let nonWhites = (str.match(/[\|\_]/g)||[]).length
  let possibleValues = digitsNonWhiteSpace.filter(function(digit) {
    return digit.nonWhites === nonWhites
  })
  if (possibleValues.length === 1) {
    return possibleValues[0].digit
  }
  let uniques = possibleValues.filter(function(possible) {
    let perfectFit = true
    for (var i = 0; i < possible.uniques.length; i++) {
      let diffChar = possible.uniques[i].char
      let digitChar = str.charAt(possible.uniques[i].index)
      perfectFit = perfectFit && (diffChar === digitChar)
    }
    return perfectFit
  })

  if (uniques.length === 1) {
    return uniques[0].digit
  }
  return null
}

function scan(text) {
  var result = []
  for(var i = 0; i < 9; i++) {
    var digitLine1 = text.substring(i * 3, i * 3 + 3)
    var digitLine2 = text.substring(i * 3 + 28, i * 3 + 31)
    var digitLine3 = text.substring(i * 3 + 56, i * 3 + 59)
    result.push(scanDigit(digitLine1 + digitLine2 + digitLine3))
  }
  return result
}

function checksum(digits) {
  let checksum = 0
  for (var i = 0; i< digits.length; i++) {
    checksum += digits[(digits.length - 1 - i)] * (i + 1)
  }
  return checksum % 11
}

module.exports = {
  ocr,
  scanDigit,
  scan,
  checksum
}
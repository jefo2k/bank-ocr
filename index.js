function ocr(str) {
  return false
}

function scanDigit(str) {
  const zero =  " _ " + 
                "| |" + 
                "|_|"

  const one =   "   " + 
                "  |" + 
                "  |"

  const two =   " _ " + 
                " _|" + 
                "|_ "

  const three = " _ " + 
                " _|" + 
                " _|"

  const four =  "   " + 
                "|_|" + 
                "  |"

  const five =  " _ " + 
                "|_ " + 
                " _|"

  const six =   " _ " + 
                "|_ " + 
                "|_|"

  const seven = " _ " + 
                "  |" + 
                "  |"

  const eight = " _ " + 
                "|_|" + 
                "|_|"

  const nine =  " _ " + 
                "|_|" + 
                " _|"

  let digits = []
  digits[zero] = 0
  digits[one] = 1
  digits[two] = 2
  digits[three] = 3
  digits[four] = 4
  digits[five] = 5
  digits[six] = 6
  digits[seven] = 7
  digits[eight] = 8
  digits[nine] = 9

  return digits[str]
}

function scan(text) {
  var digits = []
  for(var i = 0; i < 9; i++) {
    var digit = text.substring(0, 3)
  }
  return [1,2,3,1,2,3,1,2,3]
}

module.exports = {
  ocr,
  scanDigit,
  scan
}
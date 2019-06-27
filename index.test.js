const chai = require('chai')
const expect = chai.expect
const ocr = require('./index')

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


function createOcrString(digits) {
  var ocrString = ''
  //lines
  for(var i = 0; i < 3; i++) {
    digits.forEach(function(digit) {
      ocrString += digit.substring(i * 3, (i * 3) + 3)
    })
    ocrString += '\n'
  }
  return ocrString
}

describe('bank ocr',  function () {

  it('should exists', function() {
    expect(ocr).to.exist
  })

  describe('should recognize digits', function() {
    const testValues = [
      {digit: zero, value: 0},
      {digit: one, value: 1},
      {digit: two, value: 2},
      {digit: three, value: 3},
      {digit: four, value: 4},
      {digit: five, value: 5},
      {digit: six, value: 6},
      {digit: seven, value: 7},
      {digit: eight, value: 8},
      {digit: nine, value: 9},
    ]
    testValues.forEach(function(tv) {
      it(`should recognize digit: ${tv.value}`, function() {
        expect(ocr.scanDigit(tv.digit)).to.equal(tv.value)
      })
    })
  })

  it('should scan line', function() {
    var ocrTest = createOcrString([one, two, three, one, two, three, one, two, three])
    console.log(ocrTest)
    expect(ocr.scan(ocrTest)).to.eql([1,2,3,1,2,3,1,2,3])
  })
})


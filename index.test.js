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

  const validatedLines = [
    {'line': createOcrString([three, four, five, eight, eight, two, eight, six, five]), 'result': '345882865'},
    {'line': createOcrString([four, five, seven, five, zero, eight, zero, zero, zero]), 'result': '457508000'},
  ]

  it('should scan validated lines', function() {
    validatedLines.forEach((line) => {
      console.log(line.line)
      expect(ocr.scan(line.line)).to.equal(line.result)
    })
  })

  it('should calculate checksum', function() {
    expect(ocr.checksum([3,4,5,8,8,2,8,6,5])).to.equal(0)
    expect(ocr.checksum([3,4,5,8,8,2,8,6,7])).not.equal(0)
  })

  const errLines = [
    {'line': createOcrString([one, two, three, four, five, six, seven, eight, eight]), 'result': '123456788 ERR'},
    {'line': createOcrString([zero, zero, six, six, six, six, seven, seven, seven]), 'result': '006666777 ERR'},
  ]

  it('should display ERR for checksum errors', function() {
    errLines.forEach((line) => {
      console.log(line.line)
      expect(ocr.scan(line.line)).to.equal(line.result)
    })
  })

  const illLines = [
    {'line': createOcrString([
      "___" + 
      "___" + 
      "___", 
      two, three, four, five, six, seven, eight, eight]), 'result': '?23456788 ILL'},
    {'line': createOcrString([zero, zero, six, six, six, six, 
      "|_|" + 
      "|_|" + 
      "|_|", 
      , seven, seven]), 'result': '006666?77 ILL'},
  ]

  it('should display ILL for checksum errors', function() {
    illLines.forEach((line) => {
      console.log(line.line)
      expect(ocr.scan(line.line)).to.equal(line.result)
    })
  })
})


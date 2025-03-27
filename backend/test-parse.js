const fs = require('fs')
const fetch = require('node-fetch')
const pdfParse = require('pdf-parse')

const testUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

const run = async () => {
  const res = await fetch(testUrl)
  const buffer = await res.buffer()
  const data = await pdfParse(buffer)

  console.log('Extracted text:', data.text)
}

run()

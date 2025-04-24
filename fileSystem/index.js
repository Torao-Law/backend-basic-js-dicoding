const fs = require('fs')

const fileReadCallback = (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }
  console.log('File content:', data)
}

// fs.readFile('notes.txt', 'utf8', fileReadCallback) // true version
// fs.readFile('note.txt', 'utf8', fileReadCallback) // wrong version

// can using other version with path

const path = require('path')

fs.readFile(path.resolve(__dirname, 'notes.txt'), 'utf8', fileReadCallback) // absolute path
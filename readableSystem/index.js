const fs = require('fs');

const readableStream = fs.createReadStream('./article.txt', {
  highWaterMark: 10
})

readableStream.on('data', () => {
  try {
    process.stdout.write(`[${readableStream.read()}] `);
  } catch (error) {
    console.error('Error reading stream:', error);
  }
})

readableStream.on('end', () => {
  console.log('Done');
});
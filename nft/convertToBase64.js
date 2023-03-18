const fs = require('fs');
const path = require('path');

function convertWavToBase64(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const base64String = Buffer.from(data).toString('base64');
      resolve(base64String);
    });
  });
}

const directoryPath = path.join(__dirname, 'sounds');

fs.readdir(directoryPath, async function (err, files) {
  if (err) {
    console.log('Error reading directory:', err);
    return;
  }

  const results = {};

  for (const file of files) {
    if (path.extname(file) === '.wav') {
      const filePath = path.join(directoryPath, file);
      const base64String = await convertWavToBase64(filePath);
      results[file] = base64String;
    }
  }

  fs.writeFile('results.json', JSON.stringify(results), function (err) {
    if (err) {
      console.log('Error writing results file:', err);
    } else {
      console.log('Results saved to results.json');
    }
  });
});

const fs = require('fs');
const path = require('path');

// Define the path to the directory containing the files
const directoryPath = './sounds';

// Read the files in the directory
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  // Loop through the files in the directory
  files.forEach(function (file, index) {
    // Extract the file name without extension
    const fileName = path.parse(file).name;

    // Create the JSON object
    const data = {
      description: `${fileName} - unique rain sound`,
      external_url: `https://ipfs.io/ipfs/bafybeic64tgix2qix5nwbc2ioamgjmungxmlxcveza5mg5u7a4jetjhfyq/${fileName}.wav`,
      image: `https://ipfs.io/ipfs/bafybeic64tgix2qix5nwbc2ioamgjmungxmlxcveza5mg5u7a4jetjhfyq/${fileName}.wav`,
      animation_url: `https://ipfs.io/ipfs/bafybeic64tgix2qix5nwbc2ioamgjmungxmlxcveza5mg5u7a4jetjhfyq/${fileName}.wav`,
      name: fileName,
      attributes: [],
    };

    // Write the JSON object to a file
    const jsonFile = `./JSON/${index + 1}.json`;
    fs.writeFile(jsonFile, JSON.stringify(data), function (err) {
      if (err) {
        return console.log('Error writing file: ' + err);
      }
      console.log(`File ${jsonFile} created successfully.`);
    });
  });
});

const fs = require('fs');
const path = require('path');

const getUserImage = (req, res, next) => {
  const { email_address } = req.body;

  const emailRegex = new RegExp(`^${email_address.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}-\\d+-(\\d+)-(.+)$`, 'i');

  const folderPath = path.join(__dirname, '../', 'Images', 'Gab-Express-User-Profile');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return res.status(500).send('Error reading folder');
    }

    const matchingFiles = files.filter((file) => emailRegex.test(file));

    if (matchingFiles.length === 0) {
      const defaultImagePath = path.join(__dirname, '../', 'Images', 'Gab-Express-User-Profile', 'Default_profile_pict.png');
      const imageStream = fs.createReadStream(defaultImagePath);
      imageStream.on('error', (err) => {
        console.error('Error reading default image:', err);
        res.status(500).send('Error reading default image');
      });
      res.writeHead(200, { 'Content-Type': 'image/*' });
      return imageStream.pipe(res);
    }

    matchingFiles.sort((a, b) => {
      const aPath = path.join(folderPath, a);
      const bPath = path.join(folderPath, b);
      return fs.statSync(bPath).mtime.getTime() - fs.statSync(aPath).mtime.getTime();
    });

    const newestImage = matchingFiles[0];
    const imagePath = path.join(folderPath, newestImage);

    const imageStream = fs.createReadStream(imagePath);

    imageStream.on('error', (err) => {
      console.error('Error reading image:', err);
      res.status(500).send('Error reading image');
    });

    res.writeHead(200, { 'Content-Type': 'image/*' });
    imageStream.pipe(res);
  });
};

const getItemImage = (req, res, next) => {
  const { item_id, item_name } = req.body;

  const fileNameRegex = new RegExp(`^${item_name}_${item_id}\\.\\w+$`, 'i');

  const folderPath = path.join(__dirname, '../', 'Images', 'Gab-Express-Food-Items');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return res.status(500).send('Error reading folder');
    }

    const matchingFiles = files.filter((file) => fileNameRegex.test(file));

    if (matchingFiles.length === 0) {
      return res.status(404).send('Image not found');
    }

    const imagePath = path.join(folderPath, matchingFiles[0]);

    const imageStream = fs.createReadStream(imagePath);

    imageStream.on('error', (err) => {
      console.error('Error reading image:', err);
      res.status(500).send('Error reading image');
    });

    res.writeHead(200, { 'Content-Type': 'image/*' });
    imageStream.pipe(res);
  });
};

module.exports = { getUserImage, getItemImage };

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid')
const multer = require('multer')
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, files, cb, filename) => {
    console.log(files);
    cb(null, uuid() + path.extname(files.originalname));
  }
})
app.use(multer({ storage }).array('images', 3));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use(express.static(path.join(__dirname, 'public')));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));


  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

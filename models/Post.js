const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const config = require('config');
const db = config.get('mongoURI');
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  ubicacion: {
    type: String
  },
  titulo: {
    type: String
  },
  tipo: {
    type: String
  },
  frase: {
    type: String
  },
  valor: {
    type: String
  },
  servicios: {
    type: String
  },
  categoria: {
    type: String
  },
  avatar: {
    type: String
  },
  images: [{
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
  }],
  visible: {
    type: Boolean,
    default: false
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
PostSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('post', PostSchema);

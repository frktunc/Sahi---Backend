const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:I9Ew4zHtDTGrxCXg@sahioto.gsp1cjd.mongodb.net/")
    
    console.log('Veritabanına bağlandı!');
  } catch (error) {
    console.error('Veritabanına bağlanırken hata:', error);
  }
};

module.exports = { connectDB };

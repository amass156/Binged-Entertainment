const mongoose = require('mongoose');
const mongoURI =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : 'mongodb://localhost/Binged-Entertainment';

mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((instance) => console.log(`connected to db: ${instance.connections[0].name}`))
    .catch((err) => console.log(`Connection failed ${err}`));
    
module.exports = mongoose
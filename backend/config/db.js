const mongoose = require('mongoose');

const connectDB = () => {
    // const uri = "mongodb+srv://golfpunks:crEvRFFodOmaHKMk@cluster0.4g3ei.mongodb.net/bethub_db?retryWrites=true&w=majority";
    const uri = "mongodb://localhost:27017/bethub_db"
    mongoose.connect(`${uri}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    })
        .then((con) => console.log(`Database connected : ${con.connection.host}`))
        .catch((error) => {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        });
}

module.exports = connectDB;
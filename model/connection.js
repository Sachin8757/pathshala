const mongoose = require('mongoose')
const { Schema } = mongoose.Schema;
const url =  process.env.url ;

main().then(() => {
    console.log("db connected !");
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect(url)
}
import mongoose from 'mongoose';


function connectDb() {
    const db = mongoose.connect(`${process.env.DB_URL}`)
    
    db.then(()=>{
        console.log('Connection to the database made successfully')

    }).catch(error => console.error(error));
}

export { connectDb }
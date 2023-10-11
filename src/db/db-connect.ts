import mongoose from 'mongoose';
import cron from 'node-cron';


function connectDb() {
    const db = mongoose.connect(`${process.env.DB_URL}`)

    db.then(() => {
        console.log('Connection to the database made successfully')

    }).catch(error => console.error(error));
}


cron.schedule('*/30 * * * *', async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (const collection of collections) {
            await mongoose.connection.db.collection(collection.name).drop();
            console.log(`Coleção ${collection.name} apagada.`);
        }
    } catch (error) {
        console.error('Erro ao apagar as coleções:', error);
    }
})


export { connectDb }
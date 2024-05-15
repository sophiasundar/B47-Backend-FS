import nodemailer from 'nodemailer';
import { ObjectId } from "mongodb";



const MONGO_URL = process.env.MONGO_URL;

async function sendEmail(banquetDetailsId, orphangeManagerId){
    try{
        const connection = await MongoClient.connect(MONGO_URL);
        const db = connection.db('bountiful');

        const banDetailsCollect = db.collection('food');
        const orphInfoCollect = db.collection('orphanageInfo')
        
          
        const banquetDetails = await banDetailsCollect.findOne({ _id: new ObjectId(banquetDetailsId)})
          if (!banquetDetails){
            throw new Error('Banquet details not found');
          }

          const orphanageInfo = await orphInfoCollect.findOne({ _id: new ObjectId(orphangeManagerId)})
          if (!orphanageInfo){
            throw new Error('Orphanage Information not found');
          }
    
          await sendEmail(banquetDetails, orphanageInfo);

    }catch (error){
      console.error('Error fetching data or sending email:',error);
    }finally{
        await connection.close();
    }

    

}
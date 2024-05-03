import {connect} from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI).then(
        () => console.log("Connected to database"),
        (err) => console.error(err)
    ).catch((err) => console.error(err));
    
}
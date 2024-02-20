import { connect } from './db/mongo.js';

// Connect to MongoDB before starting the server
connect().then(() => {
    console.log("MongoDB started");
}).catch((error) => {
    console.log("MongoDB failed to start");
    console.log(error);
});

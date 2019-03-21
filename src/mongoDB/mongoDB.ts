import MongoClient from "mongodb/";

export default class MongoDB {
    private mongoClient: MongoClient;

    constructor(url: string) {
        this.mongoClient = new MongoClient(url);
    }

    public openConnection() {
        this.mongoClient.connect((error) => {
            if (error) {
                throw error;
            }
        });
    }
}

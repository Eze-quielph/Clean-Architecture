import moongose from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    try {
      const { mongoUrl, dbName } = options;
      const conn = await moongose.connect(mongoUrl, {
        dbName: dbName,
      });
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.warn(error);
      throw Error("MongoDB connection failed: " + error);
    }
  }
}

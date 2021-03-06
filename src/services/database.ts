const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;

export default class DatabaseService {
  dbUrl: string = config.dbUrl;
  instance: DatabaseService = null;

  constructor() {
    if (!this.instance) {
      this.instance = this;
    }

    return this.instance;
  }

  connect() {
    return MongoClient.connect(this.dbUrl);
  }
}

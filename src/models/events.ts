import DatabaseService from '../services/database';

export default class Events {
  dbService: DatabaseService = null;

  constructor() {
    this.dbService = new DatabaseService();
  }

  getAll(): Promise<any> {
    return this.dbService.connect()
      .then((db: any) => {
        return db.collection('events').find({}, {'title': 1, 'marvelId': 1, _id: 0}).sort([['title', 1]]).toArray()
          .then((events: any) => {
            db.close();
            return events;
          })
          .catch((err: any) => {
            db.close();
            return err;
          });
      })
      .catch((err: any) => err);
  }

  getStartingBy(query: string): Promise<any> {
    return this.dbService.connect()
      .then((db: any) => {
        return db.collection('events')
          .find(
            {'title': {$regex: `^${query}`, $options: 'i'}},
            {'title': 1, 'marvelId': 1, _id: 0}
          )
          .sort([['title', 1]])
          .toArray()
          .then((events: any) => {
            db.close();
            return events;
          })
          .catch((err: any) => {
            db.close();
            return err;
          });
      })
      .catch((err: any) => err);
  }

  getById(marvelId: string): Promise<any> {
    return this.dbService.connect()
      .then((db: any) => {
        return db.collection('events')
          .find({'marvelId': parseInt(marvelId, 10)}, {
            _id: 0,
            'title': 1,
            'description': 1,
            'urls': 1,
            'thumbnail': 1,
            'marvelId': 1,
          })
          .limit(1)
          .next()
          .then((event: any) => {
            db.close();
            return event;
          })
          .catch((err: any) => {
            db.close();
            return err;
          });
      })
      .catch((err: any) => err);
  }
}

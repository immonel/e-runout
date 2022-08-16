db = new Mongo().getDB('erunout');

db.createUser(
  {
    user: _getEnv('MONGO_INITDB_ROOT_USERNAME'),
    pwd: _getEnv('MONGO_INITDB_ROOT_PASSWORD'),
    roles: [
        "readWrite"
    ]
  }
);

db.createCollection('measurements', { capped: false });
db.createCollection('config', { capped: false });
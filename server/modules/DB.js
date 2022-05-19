
class DB {
    sqlite = require('sqlite3')

    constructor(){
        this.db = new this.sqlite.Database("films.db", (err) => {
            if(err) throw err;
            });
    }
}

const db = new DB();
module.exports = db
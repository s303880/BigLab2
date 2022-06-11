
class DB {
    sqlite = require('sqlite3')

    constructor(){
        this.db = new this.sqlite.Database("films.db", (err) => {
            if(err) throw err;
            });
    }

    async startDB() {
        await this.populateStudents();
        await this.populateFilms();
    }


    populateFilms(){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO films (title, favorite, watchdate, rating , user) VALUES  
            ('Shrek 2', 1, '2022-04-20', '5', 3),
            ('Shrek 3', 1, '2022-04-21', '5', 3),
            ('Shrek 4', 1, '2022-04-22', '3', 3)`
            this.db.run(sql, (err) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    }
    

    populateStudents() {

        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (email, name, hash, salt) VALUES  
            ('testuser@polito.it', 'Pietro','0aa84c6c0ba4c318447a2218201ea8fa7d024df0c5563d9942386906ea8d1e6c' , 'a2165bbc045acf4fb6d43fbf23f32e84')`
            this.db.run(sql, (err) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }
                resolve(true);
            });
        });
    }

}



const db = new DB();
module.exports = db
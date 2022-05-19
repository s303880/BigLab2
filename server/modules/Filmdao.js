

class FILMS {

    constructor(db) {
        this.db = db;
    }

    getFilms() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if(rows !== undefined){
                const films = rows.map((r) => (
                
                    {  
                        id:r.id,
                        title : r.title,
                        favorite : r.favorite,
                        watchDate : r.watchdate,
                        rating : r.rating,
                        user: r.user
                    }
                ));
                resolve(films);
            } else {
                const films = ""
                resolve(films)
            }
            });
        });
    }
}

module.exports = FILMS;
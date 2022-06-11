const crypto = require('crypto');
class users {

    constructor(db) {
        this.db = db;
    }

    getById(id){
        console.log("user dao -> getById")
        const sql = `SELECT * FROM users WHERE id=${id}`
        return new Promise((resolve, reject)=>{
            this.db.all(sql, [], function(err, rows){
                if(err){
                    console.log(err)
                    reject(err)
                }
                else{
                    if(rows[0]===undefined){
                        reject(0)
                    }
                    resolve(rows[0])
                }
            })
        })
    }

    getUser(username, password) {
        console.log('UserDAO -> getUser')
        return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        this.db.get(sql, [username], (err, row) => {
            if (err) {
              console.log(err)
              reject(err);
              return;
            }
            if (row === undefined) {resolve(false)}
             else {
                const user = {
                    ID: row.id,
                    Username: row.email,
                    Name: row.name
                }
                crypto.scrypt(password, row.salt, 32, function(err, hashedPassword){
                    if(err) reject(err);
                    if(!crypto.timingSafeEqual(Buffer.from(row.hash,'hex'), hashedPassword)){
                        resolve(false);
                    } else resolve(user)
                })
            }
          });
        });
      }


}

module.exports = users;
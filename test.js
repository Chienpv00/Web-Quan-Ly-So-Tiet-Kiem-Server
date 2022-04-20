const db = require("./config/db");
const Database = require('./dataSources/index');
const test = async () => {
    const logdb = await new Promise((resolve, reject) => { 
        db.connect((err)=>{
            if (err)
                reject(err);
            resolve('Connected!');
        })
     })

     console.log(logdb);
     const database = new Database();
    //  const data = await database.createPhieuGoiTien('PGT2', 'KH001', 'LTK1', 200000, '2022/4/19', null, 0, 0, '2022/4/19', 0.15, true);
    const data = await database.getPhieuGoiTien('PGT1')
     console.log(data);
     console.log(data.NgayGoi);
    //  const sql =`select * from khachhang`;
    //  db.query(sql, (err, result) => { 
    //      console.log(result);
    //   })
}



test()
const oracledb = require('oracledb');
var fs = require('fs');
const config = require('../config');

async function getConexion(pool) {
    return await pool.getConnection();
}

async function getPool(credentials) {
    return await oracledb.createPool({
        user: config.USERBD,
        password: config.PASSBD,
        connectString: config.CON_ORACLE,
        poolMax: 10,
        poolMin: 0,
        poolIncrement: 1,
        poolTimeout: 10,
    })
}

async function comprobateUser(credentials) {
    return await oracledb.getConnection({
        user: credentials.userbd,
        password: credentials.password,
        connectString: config.CON_ORACLE,
    }).then(async function (conn) {
        await conn.close();
        return true;
    }).catch(function (err) {
        return err.toString();
    });
    
};

const oracleDbClose = async function (conn, pool) {
    await conn.close();
    await pool.close();
    /*
    await conn.realese(function (err) {
        if (err)
            console.log(err.message);
        console.log("desconecto");
    });
    */
};

function timeoutPromise(time) {
    //options.isAutoCommit = false; // we only do SELECTs

    return new Promise(function (resolve, reject) {

        setTimeout(() => {
            reject({ message: 'Query timeout' });
        }, time);

    });
}

function queryArray(sql, bindParams, options, credentials, poolSession) {
    //options.isAutoCommit = false; // we only do SELECTs

    return new Promise(async function (resolve, reject) {
        try {
            
        
        let pool = poolSession ? poolSession : await getConexion(await getPool(credentials));

        //poolSession.then(function (connection) {
            //connection.execute(sql, bindParams, options)
            Promise.race([pool.execute(sql, bindParams, options), timeoutPromise(options.timeout)])
                .then(function (results) {
                    process.nextTick(function () {
                        //oracleDbClose(connection, pool);
                    });
                    resolve(results);
                }).catch(function (err) {
                    if (err.message === "Query timeout") {
                        process.nextTick(function () {
                            //oracleDbClose(connection, pool);
                        });
                        reject("Operación cancelada debido a tiempo de espera.");
                    } else {
                        process.nextTick(function () {
                            //oracleDbClose(connection, pool);
                        });
                        reject(err.toString());
                    }
                });
            } catch (error) {
                reject(error.toString());
        }
        

    });
}

function readCommand(ruta) {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, (error, data) => {
            if (data) {
                resolve(data.toString());
            }
            else if (error) {
                reject(error);
            }
        });
    })
};


async function queryObject({ query,ruta, bindParams = {}, options = {},poolSession, credentials ={userbd:"", password:""}}) {
    const defaultOptionsBd = {
        outFormat: oracledb.OBJECT,
        timeout: 20000,
    };
    
    const mergedOptions = { ...defaultOptionsBd, ...options };
    var sql = ruta ? await readCommand(ruta): query;
    return queryArray(sql, bindParams, mergedOptions,credentials,poolSession);
}

module.exports = {
    queryObject,
    comprobateUser,
    getPool,
    getConexion,
}


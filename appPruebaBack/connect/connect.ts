import {Sequelize} from 'sequelize';

const db = new Sequelize('dbagendamientos','root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false
});

export default db;
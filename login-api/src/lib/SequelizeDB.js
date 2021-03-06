import Sequelize from 'sequelize';
import User from '../models/User'

class SequelizeDB {
    constructor() {

    }

    async connect() {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: __dirname + "/../store/database.sqlite"
        })
        // const sequelize = new Sequelize('sqlite::memory')

        sequelize.authenticate()
            .then(() => {
                console.log("A conexão foi estabelecida.")
            }).catch(err => {
                console.error("Não foi possível conectar ao banco de dados: ", err);
            })

        // Cria a tabela no BD se ela não existir
        sequelize.sync({
            alter: true, // Verifica qual é o estado atual da tabela no banco de dados (quais colunas possui, quais são seus tipos de dados, etc), e então realiza as mudanças necessárias na tabela para fazê-lo corresponder ao modelo
            logging: false
        }).then(() => {
            console.log("Banco de dados sincronizado!")
        }).catch(err => {
            console.error("Ops! Acontenceu um erro ao atualizar o banco de dados: ", err)
        })

        // Inicializando Models
        User.init(sequelize, Sequelize)

    }
}

export default SequelizeDB;
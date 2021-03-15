import AbstractController from './AbstractController'
import User from '../models/User';
import UserRepository from '../repositories/UserRepository'
import { hash } from 'bcrypt'

const repository = new UserRepository();
class UserController extends AbstractController {
    constructor() {
        super()
    }
    list(req, res) {
        super.list(req, res, repository)
    }

    async create(req, res) {
        // Cadastra um novo
        const saltRounds = 10;
        const hashPassword = await hash(req.body.password, saltRounds)
        req.body.password = hashPassword;

        await repository.create(req.body)
        .then(async data => {
            res.status(201).send({ message: "Usuário cadastrado!", user: data});
        }).catch(err => {
            console.error(`Error Create: ${err}`)
            if(err.name.includes('UniqueConstraintError')) {
                res.status(400).send({ message: "E-mail indisponível, favor utilizar outro e-mail."});
            }
            res.status(500).send({ message: "Ocorreu um erro ao tentar cadastrar usuário."});
        })
    }
    
    async update(req, res) {
        super.update(req, res, repository)
    }

    async delete(req, res) {
        super.delete(req, res, repository)
    }
}

export default UserController
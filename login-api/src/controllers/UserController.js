import User from '../models/User'

class UserController {

    async list(req, res) {
        if (!req.params.id) {
            console.log(req.query)
             await User.findAndCountAll({
                where: req.query
            }).then( (users) => {
                res.status(200).json(users);
            }).catch(err => {
                console.error(err);
                res.status(500).send({message: "Ocorreu um erro ao listar usuários"})
            })
        } else {
            await User.findByPk(req.params.id).then(async user => {
                res.status(200).json(user.get())
            }).catch(err => {
                res.status(500).send({message: `Error GET: ${err.message}`})
            })
        }
    }

    async create(req, res) {
        await User.create(req.body)
        .then(async data => {
            res.status(201).send({ message: "Usuário cadastrado!", user: await data.get()});
        }).catch(err => {
            res.status(500).send({ message: "Ocorreu um erro ao criar o registro", err: err, request: req.body});
        })
    }

   async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        
        await User.update(data, {
            where: {
                id: id
            }
        })
        .then(data => {
            res.status(201).send({ message: "Usuário atualizado!" });
        }).catch(err => {
            res.status(500).send({ message: "Ocorreu um erro ao atualizar o registro", err: err, request: req.body});
        })    
    }

    async delete(req, res) {
        const { id } = req.params;
        await User.destroy({
            where: {
                id: id
            }
        })
        .then(async data => {
            res.status(201).send({ message: "Usuário deletado."});
        }).catch(err => {
            res.status(500).send({ message: "Ocorreu um erro ao deletar o registro", err: err, request: req.body});
        })    
    }
}

export default UserController
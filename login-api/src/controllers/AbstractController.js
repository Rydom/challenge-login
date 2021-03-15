
import {validationResult} from 'express-validator';

class AbstractController {
    constructor(repository) {
        if (new.target === AbstractController) {
            throw new Error("Não é possível instanciar uma classe abstrata diretamente.");
        }
    }
    list(req, res, repository) {
        if(!req.params.id) {
            repository.list(req.query)
            .then(users => {
                res.json(users)
            })
            .catch(err => {
                res.status(500).send({message: "Ocorreu um erro ao listar usuários"})
            })
        } else {
            repository.get(req.params.id).then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(500).send({message: `Error GET: ${err.message}`})
            })
        }
    }
    create(req, res, repository) {
        const {errors} = validationResult(req)
        if (errors.length > 0) {
            res.status(400).send({message: `Error validations: ${errors}`})
        }

        repository.create(req.body)
        .then(dataResult => {
            res.status(201).json({message: "Registro Criado!", data: dataResult})
        })
        .catch(e => {
            const message = "Não foi possível criar o registro";
            res.status(500).json({message: `Error Create: ${message}`})
        })
    }
    update(req, res, repository) {
        const {errors} = validationResult(req)
        if (errors.length > 0) {
            res.status(400).send({message: `Error validations: ${errors}`})
        }
        repository.update(req.params.id, req.body)
        .then(() => {
            res.status(201).json({message: "Registro Atualizado!"})
        })
        .catch(e => {
            console.log(e)
            const message = "Não foi possível atualizar o registro";
            res.status(500).json({message: `Error Update: ${message}`})
        })
    }
    delete(req, res, repository) {
        repository.delete(req.params.id)
        .then(() => {
            res.status(201).json({message: "Registro Deletado!"})
        })
        .catch(e => {
            const message = "Não foi possível deletar o registro";
            res.status(500).json({message: `Error Delete: ${message}`})
        })
    }
}

export default AbstractController
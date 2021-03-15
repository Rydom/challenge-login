
class AbstractRepository {
    constructor(model) {
        if (new.target === AbstractRepository) {
            throw new Error("Não é possível instanciar uma classe abstrata diretamente.");
        }
        this.model = model;
    }
    async list(params) {
        return await this.model.findAndCountAll({ where: params })
    }
    async get(id) {
        return await this.model.findByPk(id).then(async data => {
            return await data.get();
        })
        .catch(e => {
            console.error(e.message);
            throw new Error("Não foi possível buscar o registro")
        })
    }
    async create(data) {
        return await this.model.create(data)
        .then(data => {
            return data.get();
        })
        .catch(err => {
            console.error(err.message)
            throw err
        })
    }
    async update(id, data) {
        return await this.model.update(data, {
            where: {
                id: id
            }
        })
        .then(() => {
            return true;
        }).catch(err => {
            console.error(err.message)
            throw new Error("Ocorreu um erro ao atualizar o registro")
        })
    }
    async delete(id) {
        return await this.model.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            return true;
        }).catch(err => {
            console.error(err.message)
            throw new Error("Não foi possível realizar a exclusão do registro")
        })
    }
}

export default AbstractRepository
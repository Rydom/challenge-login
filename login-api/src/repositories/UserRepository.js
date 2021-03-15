import AbstractRepository from './AbstractRepository'
import User from '../models/User'

class UserRepository extends AbstractRepository {
    constructor() {
        super(User)
    }
}

export default UserRepository
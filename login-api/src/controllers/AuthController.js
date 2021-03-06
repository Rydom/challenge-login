import User from '../models/User'
import { compare, hash } from 'bcrypt'
class AuthController {

    async login(req, res) {
        // Realiza autenticação
        try {
            const { email, password } = req.body;
            if (email && password) {
                const params = { email: email };
                const user = await User.findOne({
                    where: params
                })
                
                const matchPassword = await compare(password, user.password) 

                if (user && matchPassword) {
                    res.status(200).json({ message: `Bem-vindo, ${user.username}!`})
                } else {
                    res.status(401).json({ message: "Crendenciais inválidas! verifique o seu e-mail e senha."})
                }
            }
            res.status(400).json({ message: "Você deve preencher os campos de e-mail e senha."})
        } catch (e) {
            // console.error(`Error: ${e.message}`);
            res.status(500).json({message: "Erro na autenticação."})
        }
    }
    async reset_password(req, res) {
        try {
            const { email, newPassword } = req.body;

            if(!email || !newPassword) {
                res.status(400).send({ message: "Erro na requisição"})
            }
    
            const user = await User.findOne({ where: { email: email} });
    
            if (user) {
                const saltRounds = 10;
                const hashNewPassword = await hash(newPassword, saltRounds);
                const updatePwd = { password: hashNewPassword };
                
                await User.update(updatePwd, {
                    where: { id: user.id }
                })
                res.json({ message: "Senha redefinida!"})
            } else {
                res.status(404).json({ message: "Usuário não encontrado."})
            }
        } catch (e) {
            console.error(`Error: ${e.message}`);
            res.status(500).json({ message: "Houve uma falha na redefinição de senha."})
        }
        
    }
}

export default AuthController
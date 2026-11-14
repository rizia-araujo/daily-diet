// Rotas de usuários: aqui eu só ligo o endereço ao controller.
import { Router } from 'express'
import { criarUsuario, entrar } from '../controllers/usuariosController.js'

const router = Router()

router.post('/', criarUsuario) // POST /usuarios
router.post('/login', entrar) // POST /usuarios/login

export default router

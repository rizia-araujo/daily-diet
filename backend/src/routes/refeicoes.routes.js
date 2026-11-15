// Rotas de refeições.
import { Router } from 'express'
import { identificarUsuario } from '../middlewares/identificarUsuario.js'
import {
  criarRefeicao,
  listarRefeicoes,
  buscarRefeicao,
  editarRefeicao,
  apagarRefeicao,
  metricasUsuario,
} from '../controllers/refeicoesController.js'

const router = Router()

// todas as rotas abaixo passam primeiro pelo middleware de identificação
router.use(identificarUsuario)

router.post('/', criarRefeicao) // criar
router.get('/', listarRefeicoes) // listar

// ATENÇÃO: "/metricas" precisa vir ANTES de "/:id".
// Se ficasse depois, o express acharia que "metricas" é um id!
router.get('/metricas', metricasUsuario)

router.get('/:id', buscarRefeicao) // ver uma
router.put('/:id', editarRefeicao) // editar
router.delete('/:id', apagarRefeicao) // apagar

export default router

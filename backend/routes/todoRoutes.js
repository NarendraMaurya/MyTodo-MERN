const { getTodos, getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoControllers');

const router = require('express').Router();

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/add', addTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

module.exports = router;
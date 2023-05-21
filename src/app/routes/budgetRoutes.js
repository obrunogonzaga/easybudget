const express = require('express');
const controller = require('../controllers/budgetController');

const router = express.Router();

router.post('/', controller.createBudget);
router.get('/', controller.getBudget);
router.put('/:id', controller.updateBudget);
router.delete('/:id', controller.deleteBudget);

module.exports = router;

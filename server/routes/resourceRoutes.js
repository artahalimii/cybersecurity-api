const express= require('express');
const router = express.Router();
const {createResourceLog, getAllResourceLogs, getResourceLogById, 
      updateResourceLog, deleteResourceLog} = require('../controllers/resourceController');

router.post('/resources', createResourceLog);
router.get('/resources', getAllResourceLogs);

router.get('/resources/:id', getResourceLogById);
router.put('/resources/:id', updateResourceLog);
router.delete('/resources/:id', deleteResourceLog);

module.exports = router;

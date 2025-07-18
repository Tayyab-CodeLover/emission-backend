const express = require('express');
const {authanticateToken} = require('../middlewares/authMeddleware')
const { create, getData } = require('../controllers/mapDataController');
const router = express.Router()


router.post('/add',authanticateToken,create);
router.get('/history',authanticateToken,getData)


module.exports = router
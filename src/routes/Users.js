const { Router } = require('express');
const router = Router();
const {getUsers,getUser,postUser,putUser, patchUser,deleteUser} = require('../controllers/Users');

router.get('/' , getUsers);

router.get('/user/:id' , getUser);

router.post('/user' , postUser);

router.put('/user/:id' , putUser);

router.patch('/user/:id' , patchUser);

router.delete('/user/:id' , deleteUser);

module.exports = router;
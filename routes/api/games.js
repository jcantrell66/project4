const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/games');
const multer = require('multer');
const upload = multer();
/*---------- Public Routes ----------*/
router.post('/', gamesCtrl.create)
router.get('/', gamesCtrl.getAPI)
// router.get('/', disableCors, gamesCtrl.getAPI)



/*---------- Protected Routes ----------*/
function isAuthenticated(req, res, next){
	if(req.user){
		next()
	} else {
		res.status(401).json({data: 'Not Authorized!'})
	}
}


module.exports = router;
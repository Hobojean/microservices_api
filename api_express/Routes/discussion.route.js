const express = require('express');
const router = express.Router();
const discussionController = require('../Controllers/discussion.controller');
const checkTokenMiddleware = require('../controllers/jwt.controller');

router.post('/create', checkTokenMiddleware.checkToken, discussionController.createDiscussion);
router.get('/showAllOwned', checkTokenMiddleware.checkToken, discussionController.showAllDiscussionByOwner);
router.get('/showAllIn', checkTokenMiddleware.checkToken, discussionController.showAllDiscussionIn);
router.put('/removeUser/:discussionId', checkTokenMiddleware.checkToken, discussionController.removeUserFromDiscussion);
router.put('/addUser/:discussionId/:userId', checkTokenMiddleware.checkToken, discussionController.addUserInDiscussion);
router.delete('/delete/:id', checkTokenMiddleware.checkToken, discussionController.deleteDiscussion);


module.exports = router;

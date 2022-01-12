const DiscussionService = require('../Services/discussion.service');

exports.createDiscussion = async (req, res) => {
    try {
        let discussion = await DiscussionService.createDiscussion(req.body, req.user.sub);
        res.status(200);
        res.send(discussion);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}
exports.deleteDiscussion = async (req, res) => {
    try {
        let discussion = await DiscussionService.deleteDiscussion(req.params.id);
        res.status(200);
        res.send(discussion);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.showAllDiscussionByOwner = async (req, res) => {
    try {
        let discussion = await DiscussionService.showAllDiscussionByOwner(req.user.sub);
        res.status(200);
        res.send(discussion);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.addUserInDiscussion = async (req, res) => {
    try {
        let discussion = await DiscussionService.addUserInDiscussion(req.params.discussionId, req.params.userId);
        res.status(200);
        res.send(discussion);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.removeUserFromDiscussion = async (req, res) => {
    try {
        let discussion = await DiscussionService.removeUserFromDiscussion(req.params.discussionId, req.user.sub);
        res.status(200);
        res.send(discussion);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}

exports.showAllDiscussionIn = async (req, res) => {
    try {
        let discussion = await DiscussionService.showAllDiscussionIn(req.user.sub);
        res.status(200);
        res.send(discussion);
    } catch (e) {
        res.status(400)
        res.send({
            success: false,
            errors: e
        })
    }
}


const DiscussionModel = require('../Models/discussion.model.js');

exports.createDiscussion = async (form, userId) => {
    try {
        if(form.name === '') {
            return {
                success : false,
                error : 'Le champs ne peut pas être vide'
            }
        } else {
            const discussion = new DiscussionModel({name: form.name, owner: userId, users: {fk_id_user : userId}, messages:[], createdAt: new Date(), updatedAt: new Date()});
            Object.assign(discussion, form)
            let response = await discussion.save();
            if (response) {
                return {
                    success:true,
                    discussion: discussion
                }
            } else {
                return {
                    success: false
                }
            }}
    } catch (e) {
        throw e;
    }
}

exports.deleteDiscussion = async (id) => {
    try {
        await DiscussionModel.deleteOne({_id: id});
        return {
            success: true
        };
    } catch (error) {
        throw error
    }
}

exports.showAllDiscussionByOwner = async (userId) => {
    try {
        const discussion = await DiscussionModel.find({"owner": userId})
        return {
            success:true,
            discussion: discussion
        }
    } catch (e) {
        throw e
    }
}

exports.showAllDiscussionIn = async (userId) => {
    try {
        const discussion = await DiscussionModel.find({"users.fk_id_user": userId, "owner":userId })
        return {
            success:true,
            discussion: discussion
        }
    } catch (e) {
        throw e
    }
}

exports.addUserInDiscussion = async (discussionId, userId) => {
    try {
        const currentDiscussion = await DiscussionModel.findOneAndUpdate({_id : discussionId}, {$push: {users : {fk_id_user : userId} }});
        const updateDate = await DiscussionModel.findByIdAndUpdate({_id:discussionId}, {"updatedAt" : new Date()})
        return{
            success:true,
            discussion:currentDiscussion
        }

    } catch (e) {
        throw e
    }
}

exports.removeUserFromDiscussion = async (discussionId, userId) => {
    try {
        const removeUser = await DiscussionModel.findOneAndUpdate({_id : discussionId}, {$pull : {users: {fk_id_user : userId}}})
        const updateDate = await DiscussionModel.findByIdAndUpdate({_id:discussionId}, {"updatedAt" : new Date()})
        return {
            success : true,
            discussion: removeUser
        }
    } catch (e) {
        throw e
    }
}

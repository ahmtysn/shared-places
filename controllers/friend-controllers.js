const HttpError = require('../models/http-error');
const User = require('../models/User');
const mongoose = require('mongoose');


const getfriends = async (req, res, next) => {
    const { userId } = req.body
    let user;
    try {
        user = await User.findById(userId)

    }

    catch (err) {
        const error = new HttpError(
            'Getting friends failed, please try again later.',
            500
        );
        return next(error);
    }
    const friendsList = user.friends
    res.status(200).json(friendsList);
}

const createFriendRequest = async (req, res, next) => {
    const { friendId, userId } = req.body
    let friendReqSender, friendReqReceiver;

    try {
        friendReqReceiver = await User.findById(friendId);
        friendReqSender = await User.findById(userId)
        if (friendReqReceiver.requestslist.find(u => u.id === userId)) {
            const error = new HttpError(
                'You have already sent a friend request before you can not send more than one request to each friend thanks',
                500
            );
            return next(error);

        }
        if (friendReqReceiver.friends.find(u => u.id === userId)) {
            const error = new HttpError(
                'You have him/her already as friend you can not add it again',
                500
            );
            return next(error);

        }
        friendReqReceiver.requestslist.push({ id: friendReqSender.id, name: friendReqSender.name, image: friendReqSender.image });
        await friendReqReceiver.save()
    }

    catch (err) {
        const error = new HttpError(
            'Adding friend failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ msg: "Added " })
}


const acceptFriendRequest = async (req, res, next) => {
    const { friendId, userId } = req.body
    console.log('got a request from the front end')
    let friendReqReceiver, friendReqSender;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        friendReqReceiver = await User.findById(userId)
        friendReqSender = await User.findById(friendId)
        friendReqReceiver.requestslist = friendReqReceiver.requestslist.filter(u => u.id !== friendId);
        friendReqReceiver.friends.push({
            id: friendId,
            email: friendReqSender.email,
            image: friendReqSender.image,
            name: friendReqSender.name,
            places: friendReqSender.places
        });
        friendReqSender.friends.push({
            id: userId,
            email: friendReqReceiver.email,
            image: friendReqReceiver.image,
            name: friendReqReceiver.name,
            places: friendReqReceiver.places
        });
        await friendReqReceiver.save({ session: sess });
        await friendReqSender.save({ session: sess });
        await sess.commitTransaction();

    }

    catch (err) {
        const error = new HttpError(
            'Adding friend failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ msg: "Accepted " })

}

const rejectFriendRequest = async (req, res, next) => {
    const { friendId, userId } = req.body
    let user, sender;
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        user = await User.findById(userId);
        sender = await User.findById(friendId);
        user.requestslist = user.requestslist.filter(u => u.id !== friendId)
        await user.save({ session: sess })
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'rejecting friend failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ msg: "Rejected" })
}

const deleteFriend = async (req, res, next) => {
    console.log('got Delete Request')

    const { friendId, userId } = req.body
    let friendReqReceiver, friendReqSender;
    console.log(userId, friendId)
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        friendReqReceiver = await User.findById(userId)
        friendReqSender = await User.findById(friendId)
        friendReqReceiver.friends = friendReqReceiver.friends.filter(u => u.id !== friendId);
        friendReqSender.friends = friendReqSender.friends.filter(u => u.id !== userId);
        await friendReqReceiver.save({ session: sess });
        await friendReqSender.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'delete  friend failed, please try again later.' + err,
            500
        );
        return next(error);
    }
    res.json({ msg: friendReqReceiver.friends, ms: friendReqSender.friends })
}
exports.getfriends = getfriends;
exports.createFriendRequest = createFriendRequest;
exports.acceptFriendRequest = acceptFriendRequest;
exports.rejectFriendRequest = rejectFriendRequest;
exports.deleteFriend = deleteFriend;
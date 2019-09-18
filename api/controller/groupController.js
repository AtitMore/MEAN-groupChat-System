const mongoose = require('mongoose');
const groupMessagesModel = require('../Model/groupMessages');
const groupModel = require('../Model/group');
const groupController = {};


groupController.insertMessages = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        groupMessagesModel.create(reqBody)
            .then((data) => {
                res.status(200).send({
                    "status": 200,
                    data: data,
                    "message": "Data inserted",
                })
            }).catch((err) => {
                res.status(200).send({
                    "status": 404,
                    error: err,
                    "message": "Error Occurs",
                })
            })

    } catch (err) {
        console.log(err);
    }
}

groupController.getMessages = async (req, res) => {
    try {
        groupMessagesModel.find()
            .then((data) => {
                res.status(200).send({
                    "status": 200,
                    data: data,
                    "message": "Data Fetched",
                })
            }).catch((err) => {
                res.status(200).send({
                    "status": 404,
                    error: err,
                    "message": "Error Occurs",
                })
            })
    } catch (err) {
        console.log(err);
    }
}

groupController.getUsers = async (req, res) => {
    try {
        groupModel.find()
            .then((data) => {
                console.log(data)
                res.status(200).send({
                    "status": 200,
                    data: data,
                    "message": "Data Fetched",
                })
            }).catch((err) => {
                res.status(200).send({
                    "status": 404,
                    error: err,
                    "message": "Error Occurs",
                })
            })
    } catch (err) {
        console.log(err);
    }
}
groupController.removeUser = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));

        const data = {
            groupName: reqBody.group_name,
            username: reqBody.username
        }

        groupModel.update({ group_name: data.groupName },
            { $pull: { users: { "username": data.username } } })
            .then(data => {
                res.status(200).send({
                    "status": 200,
                    data: data,
                    "message": "User Removed",
                }).catch((err) => {
                    res.status(200).send({
                        "status": 404,
                        error: err,
                        "message": "Error Occurs",
                    })
                })
            })
    } catch (err) {
        console.log(err);
    }
}

groupController.userAutho = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));

        let find = {
            group_name: reqBody.group_name,
            username: reqBody.username
        }

        groupModel.find({ "group_name": find.group_name, "users.username": find.username })
            .then(data => {
                res.status(200).send({
                    "status": 200,
                    data: data == '' ? false : data,
                    "message": "correct api"
                }).catch((err) => {
                    res.status(200).send({
                        "status": 404,
                        "error": err,
                        "message": "Error Occurs"
                    })
                })
            });
    } catch (error) {
        console.log(error);
    }
}

groupController.joinRequest = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));

        const group = {
            groupName: reqBody.group_name,
        }
        const user = {
            username: reqBody.username,
            user_level: reqBody.user_level,
            status: "pending",
            clickStatus: reqBody.clickStatus,
        }

        if (user.clickStatus == 'join') {

            groupModel.update({ group_name: group.groupName },
                {
                    "$push": {
                        "users": {
                            username: user.username,
                            user_level: user.user_level,
                            status: user.status
                        }
                    }
                })
                .then(data => {
                    res.status(200).send({
                        "status": 200,
                        data: data,
                        "message": "User Added",
                    }).catch((err) => {
                        res.status(200).send({
                            "status": 404,
                            error: err,
                            "message": "Error Occurs",
                        })
                    })
                })
        } else {
            groupModel.update({ group_name: group.groupName },
                {
                    "$pull": {
                        "users": {
                            username: user.username,
                            user_level: user.user_level,
                            status: user.status
                        }
                    }
                })
                .then(data => {
                    res.status(200).send({
                        "status": 200,
                        data: data,
                        "message": "User Added",
                    }).catch((err) => {
                        res.status(200).send({
                            "status": 404,
                            error: err,
                            "message": "Error Occurs",
                        })
                    })
                })
        }
    } catch (err) {
        console.log(err);
    }
}

groupController.approvalStatus = async (req, res) => {
    let reqBody = JSON.parse(JSON.stringify(req.body));

    let data = {
        group_name: reqBody.group_name,
        username: reqBody.username,
        status: reqBody.status
    }

    if (data.status == 'approve') {
        groupModel.update({ "group_name": data.group_name, "users.username": data.username },
            {
                "$set": {
                    "users.$.status": "approved"
                }
            })
            .then(data => {
                res.status(200).send({
                    "status": 200,
                    data: data,
                    "message": "User Added",
                }).catch((err) => {
                    res.status(200).send({
                        "status": 404,
                        error: err,
                        "message": "Error Occurs",
                    })
                })
            })
    } else {
        groupModel.update({ group_name: data.group_name },
            {
                "$pull": {
                    "users": {
                        username: data.username,
                    }
                }
            })
            .then(data => {
                res.status(200).send({
                    "status": 200,
                    data: data,
                    "message": "User Added",
                }).catch((err) => {
                    res.status(200).send({
                        "status": 404,
                        error: err,
                        "message": "Error Occurs",
                    })
                })
            })
    }
}

module.exports = groupController;
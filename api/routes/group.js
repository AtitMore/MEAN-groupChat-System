const express = require('express');
const router = express.Router();

const groupController = require('../controller/groupController');

router.post('/insert_messages', groupController.insertMessages, (req, res) => {
});

router.get('/get_messages', groupController.getMessages, (req, res) => {
});

router.get('/get_user_list', groupController.getUsers, (req, res) => {
});

router.post('/remove_user', groupController.removeUser, (req, res) => {
});

router.post('/user_rights', groupController.userAutho, (req, res) => {
});

router.post('/join_request', groupController.joinRequest, (req, res) => {
});

router.post('/approval_request', groupController.approvalStatus, (req, res) => {
});


module.exports = router
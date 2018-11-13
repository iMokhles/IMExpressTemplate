var express = require('express');
var router = express.Router();

var loginController = require('../app/http/controllers/auth/LoginController');
var registerController = require('../app/http/controllers/auth/RegisterController');
var verificationController = require('../app/http/controllers/auth/VerificationController');
var forgotPasswordController = require('../app/http/controllers/auth/ForgotPasswordController');
var resetPasswordController = require('../app/http/controllers/auth/ResetPasswordController');

/*
  Login Routes
 */
router.get('/login', loginController.getLoginForm);
router.post('/login', loginController.postLoginForm);

/*
  Logout Routes
 */
router.get('/logout', loginController.logout);
router.post('/logout', loginController.logout);

/*
  Register Routes
 */
router.get('/register', registerController.getRegisterForm);
router.post('/register', registerController.postRegisterForm);

/*
  Password Routes
 */
router.get('/password/reset', forgotPasswordController.getLinkRequestForm);
router.post('/password/email', forgotPasswordController.postResetLinkEmail);
router.get('/password/reset/:token', resetPasswordController.getResetForm);
router.post('/password/reset', resetPasswordController.postReset);

/*
    Verification Routes
 */
router.get('/email/verify', verificationController.getVerifyPage);
router.get('/email/verify/:token', verificationController.postVerify);
router.get('/email/resend', verificationController.postResend);

module.exports = router;

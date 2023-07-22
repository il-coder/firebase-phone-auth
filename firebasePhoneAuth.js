/*
Author      : Piyush Garg
Date        : 22-July-2023 
Org.        : IL Coders
Version     : 1.0.0
Description : A simplified JS wrapper over the firebase phone authentication process
GitHub      : 
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Function to initialize the config
function initPhoneAuth(firebaseConfig, recaptcha, autoSignOut = true) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  window.firebasePluginApp = app;
  window.firebasePluginAuth = auth;

  auth.useDeviceLanguage();

  if (autoSignOut == true || autoSignOut == "true") {
    window.autoSignOut = true;
  } else {
    window.autoSignOut = false;
  }

  // initialize recaptcha
  window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptcha, {});

  // render the recaptcha
  const recaptchaVerifier = window.recaptchaVerifier;
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
}

// ===================== Helpers Functions Start ============================

// function to reset recaptcha
function resetCaptcha() {
  // console.log(grecaptcha);
  window.recaptchaVerifier.render().then(function (widgetId) {
    grecaptcha.reset(widgetId);
  });
}

// default action on OTP send success
function defaultSendSuccess(confirmationResult) {
  alert("OTP Sent");
  console.log("Send OTP Result =", confirmationResult);
  return confirmationResult;
}

// default action on OTP send failure
function defaultSendFailure(error) {
  alert("OTP not sent due to some error");
  console.log("Send OTP Error:", error);
  return error;
}

// default action on OTP verification Success
function defaultVerifySuccess(result) {
  alert("OTP Verified");
  console.log("Verify OTP Result = ", result);
  return result;
}

// default action on OTP verification Failure
function defaultVerifyFailure(error) {
  alert("OTP mismatch or error");
  console.log("Verify OTP Error :", error);
  return error;
}

// ===================== Helpers Functions End ============================

// Function to send the OTP
function sendOtp(
  phoneNumber,
  success = defaultSendSuccess,
  failure = defaultSendFailure
) {
  const appVerifier = window.recaptchaVerifier;
  const auth = window.firebasePluginAuth;

  console.log(appVerifier);

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      return success(confirmationResult);
    })
    .catch((err) => {
      resetCaptcha();
      return failure(err);
    });
}

// Function to verify the OTP
function verifyOtp(
  otp,
  success = defaultVerifySuccess,
  failure = defaultVerifyFailure
) {
  const confirmationResult = window.confirmationResult;
  const auth = window.firebasePluginAuth;
  confirmationResult
    .confirm(otp)
    .then((res) => {
      if (window.autoSignOut) signOut(auth);
      return success(res);
    })
    .catch(failure);
}

// export from the module
export { initPhoneAuth, resetCaptcha, sendOtp, verifyOtp };

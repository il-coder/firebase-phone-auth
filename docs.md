# Plug-in for Phone Authentication using Firebase

## Methods

### `initPhoneAuth(firebaseConfig, recaptchaId [, autoSignOut]) :: none`

This function is used to initialize the firebase and recaptcha and other settings.

#### Parameters

`firebaseConfig` - The jSON object of firebase config. This can be found in the firebase project settings.

`recaptchaId` - It is the string which contains the "Id" of the empty "div" container for the recaptcha

`autoSignOut` - If it is "true", then the firebase will be auto logged out from the session. Set it to "false", if you want to maintain login session usign firebase only. It's an optional paramter with default value as "true".

#### Return value

This function doesn't return anything

### `resetCaptcha() :: none`

This function is used to reset the captcha container if you wish to do so or in case of errors

#### Parameters

This function doesn't expect any parameter

#### Return value

This function doesn't return anything

### `sendOtp(phoneNumber [, successCallback] [, failureCallback]) :: result`

This function is used to send the Otp to the provided phone number

#### Parameters

`phoneNumber` - It's mandatory field containing phone number on which OTP needs to be sent. It must be in format {+countryCode}{10 digits phone number}. For example- "+919876543210"

`success` - This parameters accepts a callback function with one parameter which is executed when the OTP is sent successfully. It's an optional parameter and by default, it creates an alert and logs the value to the console.

`failure` - This parameters accepts a callback function with one parameter which is executed when there is any error and OTP is not sent successfully. It's an optional parameter and by default, it creates an alert and logs the value to the console.

#### Return value

`result` - It returns the value being returned by the successCallback or failureCallback. By default, if no callbacks are provided, then it returns the result received from firebase as it is.

### `verifyOtp(otp [, success] [, failure]) :: result`

This function is used to verify the Otp received on the provided phone number in the sendOtp() function call

#### Parameters

`otp` - It's mandatory field containing the received otp.

`success` - This parameters accepts a callback function with one parameter which is executed when the OTP is verified successfully. It's an optional parameter and by default, it creates an alert and logs the value to the console.

`failure` - This parameters accepts a callback function with one parameter which is executed when there occurs any error or OTP is not sent verified. It's an optional parameter and by default, it creates an alert and logs the value to the console.

#### Return value

`result` - It returns the value being returned by the successCallback or failureCallback. By default, if no callbacks are provided, then it returns the result received from firebase as it is.

## How to use?

- Import the script in your HTML file
- Use the functions as per need
- Refer the example provided for usage guide

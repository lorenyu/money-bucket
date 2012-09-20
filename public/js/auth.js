MB.namespace('auth');

MB.auth.promptUserForLogin = function(callback) {

  var onFacebookLogin = function(authResponse) {
    MB.auth.login({
      facebookId: authResponse.userID,
      accessToken: authResponse.accessToken
    }, callback);
  };

  MB.facebook(function() {
    FB.getLoginStatus(function(response) {

      if (response.status === 'connected') {
        onFacebookLogin(response.authResponse);
        return;
      }

      FB.login(function(response) {
        if (response.authResponse) {
          onFacebookLogin(response.authResponse);
        }
      });
    });
  });
};

MB.auth.login = function(credentials, callback) {
  $.ajax({
    type: 'POST',
    url: '/api/auth/login',
    data: {
      credentials: credentials
    },
    dataType: 'json',
    success: callback
  });
};

MB.auth.logout = function(callback) {
  $.ajax({
    type: 'POST',
    url: '/api/auth/logout',
    success: callback
  });
};
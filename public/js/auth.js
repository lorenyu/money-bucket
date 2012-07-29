MB.namespace('auth');

MB.auth.promptUserForLogin = function() {

  var onFacebookLogin = function(authResponse) {
    MB.auth.login({
      facebookId: authResponse.userID,
      accessToken: authResponse.accessToken
    });
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

MB.auth.login = function(credentials) {
  $.ajax({
    type: 'POST',
    url: '/api/auth/login',
    data: {
      credentials: credentials
    },
    dataType: 'json',
    success: function() {
      window.location.reload();
    }
  });
};

MB.auth.logout = function() {
  $.ajax({
    type: 'POST',
    url: '/api/auth/logout',
    success: function() {
      window.location.reload();
    }
  });
};
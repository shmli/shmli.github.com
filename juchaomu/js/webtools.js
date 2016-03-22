var WebTools = {
	getCookie: function(name) {
    var cookie = '; ' + document.cookie;
    cookieArray = cookie.split('; ' + name + '=');
    if (cookieArray.length == 2) {
      return cookieArray.pop().split(';').shift();
    }
    return undefined;
  },
};

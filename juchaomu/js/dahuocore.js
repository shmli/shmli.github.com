var DahuoCore = {
  isDahuo: function() {
    var sUA = navigator.userAgent.toLowerCase();
    if (sUA.match('dahuo') == 'dahuo') {
      return true;
    }
    return false;
  },
  toast: function(options) {
  	var defaultOptions = {
  		content: '',
  		timeout: 1500
  	};
  	var opts = $.extend({}, defaultOptions, options);
  	var html = '<section class="dahuocore-toast"><p>' + opts.content + '</p></section>';
  	var $toast = $('.dahuocore-toast');
  	if ($toast.length) {
  		$toast.html(opts.content);
  	} else {
  		$('body').append(html);
  		$toast = $('.dahuocore-toast');
  	}
  	$toast.addClass('visible');
  	setTimeout(function() {
  		$toast.removeClass('visible');
  	}, opts.timeout);
  }
};
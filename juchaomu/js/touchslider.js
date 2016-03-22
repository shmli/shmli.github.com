(function($) {
	$.extend($.fn, {
		slider: function(options) {
			this.each(function() {
				self = $(this);
				var dom = {
		      sliderList: self,
		      sliderItems: self.find('li'),
		      firstSlider: self.find('li').first(),
		      lastSlider: self.find('li').last()
		    };
		    var settings = {
		      sliderWidth: dom.sliderList.width(),
		      sliderAmount: dom.sliderItems.length,
		      timer: null
		    };
		    var defaultOptions = {
		    	isScroll: true,
		    	direction: -1,
		    	interval: 3000,
		    	distance: settings.sliderWidth / 10
		    };
		    var opts = $.extend(true, {}, defaultOptions, options);
		    var curSliderId = 1;
		    var funs = {
		      init: function() {
		        if (settings.sliderAmount > 1) {
		          funs.initUI();
		          dom.indicators = self.parent().find('.indicator li');
		          dom.sliderList.css('-webkit-transform', 'translate3d(' + -settings.sliderWidth + 'px,0,0)');
		          if (opts.isScroll) {
			          settings.timer = setInterval(function() {
			            funs.scroll(opts.direction);
			          }, opts.interval);
		          }
		          funs.bindEvent();
		        }
		      },
		      initUI: function() {
		        dom.sliderList.append(dom.firstSlider.clone())
		          .prepend(dom.lastSlider.clone());
		        funs.createIndicator();
		      },
		      createIndicator: function() {
		        var html = '<ul class="indicator">' +
		          '<li class="active"></li>';
		        for (var i=1; i<settings.sliderAmount; i++) {
		          html += '<li></li>';
		        }
		        html += '</ul>';
		        self.after(html);
		      },
		      scroll: function(direction) {
		        direction < 0 ? curSliderId++ : curSliderId--;
		        dom.sliderList.addClass('transitionable');
		        dom.sliderList.css('-webkit-transform', 'translate3d(' + -(settings.sliderWidth * curSliderId) + 'px,0,0)');
		        dom.indicators.removeClass('active');
		        dom.indicators.eq(curSliderId - 1).addClass('active');
		        if (curSliderId == settings.sliderAmount + 1 || curSliderId == 0) {
		          var curIndicator = (curSliderId == 0 ? dom.indicators.last() : dom.indicators.first());
		          curIndicator.addClass('active');
		          setTimeout(function() {
		            funs.resetSliderList(direction);
		          }, 500);
		        }
		      },
		      resetSliderList: function(direction) {
		        curSliderId = (direction < 0 ? 1 : settings.sliderAmount);
		        dom.sliderList.removeClass('transitionable');
		        dom.sliderList.css('-webkit-transform', 'translate3d(' + (-settings.sliderWidth * curSliderId) + 'px,0,0)');
		      },
		      adjustSize: function() {
		      	settings.sliderWidth = dom.sliderList.width();
		      	dom.sliderList.css('-webkit-transform', 'translate3d(' + (-settings.sliderWidth * curSliderId) + 'px,0,0)');
		      },
		      bindEvent: function() {
		        dom.sliderItems.on({
		          'touchstart': function(e) {
		          	e.preventDefault();
		            clearInterval(settings.timer);
		            settings.startX = e.touches[0].pageX;
		          },
		          'touchmove': function(e) {
		            dom.sliderList.removeClass('transitionable');
		            settings.moveX = e.touches[0].pageX - settings.startX;
		            dom.sliderList.css('-webkit-transform', 'translate3d(' + (-settings.sliderWidth * curSliderId + settings.moveX) + 'px,0,0)');
		          },
		          'touchend': function(e) {
		            if (Math.abs(settings.moveX) > opts.distance) {
		              if (settings.moveX < 0) {
		                funs.scroll(-1);
		              } else {
		                funs.scroll(1);
		              }
		            } else {
		              dom.sliderList.addClass('transitionable');
		              dom.sliderList.css('-webkit-transform', 'translate3d(' + (-settings.sliderWidth * curSliderId) + 'px,0,0)');
		            }
		            if (opts.isScroll) {
		            	settings.timer = setInterval(function() {
			              funs.scroll(opts.direction);
			            }, opts.interval);
		            }
		          }
		        });
						$(window).on('resize', function() {
							funs.adjustSize();
						});
		      }
		    };
		    funs.init();
			});
		}
	});
})(window.Zepto || window.Jquery);
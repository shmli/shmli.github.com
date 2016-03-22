var HomePage = {
  init: function() {
  	this.fetchData();
  },
  fetchData: function() {
  	var self = this;
  	$.ajax({
  		url: encodeURI(ApiConfig.home),
  		type: 'GET',
  		dataType: 'json',
  		data: {
  			userId: CommonData.userId,
  			token: CommonData.token
  		},
  		complete: function(xhr, status) {
  			if (status == 'success') {
  				var resp = $.parseJSON(xhr.response);
  				if ($.type(resp) == 'object') {
  					if (resp.status == 1) {
  						if (resp.data) {
  							self.processData(resp.data);	
  						} else {
  							DahuoCore.toast({content: '加载失败，请稍后再试'});
  						}
  					} else if (resp.status == 0) {
              DahuoCore.toast({content: resp.msg});
  					} else {
  						DahuoCore.toast({content: '加载失败，请稍后再试'});
  					}
  				} else {
  					DahuoCore.toast({content: '加载失败，请稍后再试'});
  				}
  			} else {
  				DahuoCore.toast({content: '加载失败，请稍后再试'});
  			}
  		}
  	});
  },
  processData: function(data) {
    if (data.banners) {
      var bannerHtml = this.getBannerHtml(data.banners);
      $('#banner ul').html(bannerHtml);
      $('ul.slider-list').slider();
    }
    $('#search-display').show();
    $('#guides').show();
    if (data.products) {
      var productHtml = this.getProductHtml(data.products);
      $('#products ul').html(productHtml);
    }
  },
  getBannerHtml: function(items) {
    var html = '';
    for (var i=0; i<items.length; i++) {
      html += '<li><img src="' + items[i].image + '"></li>';
    }
    return html;
  },
  getProductHtml: function(items) {
    var html = '';
    for (var i=0; i<items.length; i++) {
      var month1IncomeRate = (items[i].productEx.extendedFields.month1IncomeRate / 10000).toFixed(2);
      var year1IncomeRate = (items[i].productEx.extendedFields.year1IncomeRate / 10000).toFixed(2);
      html += '<li>' +
        '<div class="header">' +
          '<span>' + items[i].productEx.displayExtendedFields.productName +
          '</span>' +
          (items[i].featuredTags ? ('<span class="featured-tag">' + items[i].featuredTags + '</span>') : '') +
        '</div>' +
        '<div class="manager">' +
          '基金经理：' +　items[i].productEx.displayExtendedFields.fundManagerName +
        '</div>' +
        '<div class="main">' +
          '<div>' +
            '<span class="font-color-green value">' + month1IncomeRate +
            '</span><br>' +
            '<span class="label">近一月收益(%)</span>' +
          '</div>' +
          '<div>' +
            '<span class="font-color-orange value">' + year1IncomeRate +
            '</span><br>' +
            '<span class="label">近一年收益(%)</span>' +
          '</div>' +
        '</div>' +
        '<div class="bottom">' +
          items[i].slogan +
        '</div>' +
      '</li>';
    }
    return html;
  }
};
HomePage.init();
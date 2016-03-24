var Fundlist = {
	init: function() {
		this.fetchData();
		this.bindEvent();
	},
	fetchData: function() {
  	var self = this;
  	$.ajax({
  		url: encodeURI('https://www.juchaomu.com/apisimu/queryproducts?strategy=&category=&inceptionYear=0&sortBy=year_income_rate&offset=0&count=20&searchWord=&userId=0&token='),
  		type: 'GET',
  		dataType: 'json',
  		// data: {
  		// 	userId: CommonData.userId,
  		// 	token: CommonData.token
  		// },
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
  	var html = this.getHtml(data);
  	$('#fund-list tbody').html(html);
  },
  getHtml: function(items) {
  	var html = '';
  	for (var i=0; i<items.length; i++) {
  		html += '<tr>' +
  			'<td>' + items[i].displayExtendedFields.productName + '</td>' +
				'<td>' + (items[i].extendedFields.marketPrice / 10000).toFixed(4) + '</td>' +
				'<td class="font-color-orange">+' + (items[i].extendedFields.yearIncomeRate / 10000).toFixed(2) + '%</td>' +
				'</tr>';
  	}
  	return html;
  },
  bindEvent: function() {
  	$('#filters li').on('click', function() {
  		$('.filter-options').hide();
  		$('.' + $(this).attr('id') + '-options').toggle();
  		$('#mask').toggle();
  	});
  	$('#mask').on('click', function() {
  		$('.filter-options').hide();
  		$('#mask').hide();
  	});
  }
};
Fundlist.init();
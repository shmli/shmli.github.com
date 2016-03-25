var Fundlist = {
  params: {
    strategy: '',
    category: '',
    inceptionYear: 0,
    sortBy: 'year_income_rate',
    offset: 0,
    count: 20,
    searchWord: ''
  },
  init: function() {
    this.fetchData();
    this.bindEvent();
  },
  fetchData: function() {
    var self = this;
    $.ajax({
      url: encodeURI('https://www.juchaomu.com/apisimu/queryproducts'),
      type: 'GET',
      dataType: 'json',
      data: {
        strategy: self.params.strategy,
        category: self.params.category,
        inceptionYear: self.params.inceptionYear,
        sortBy: self.params.sortBy,
        offset: self.params.offset,
        count: self.params.count,
        searchWord: self.params.searchWord,
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
    var filterOptions = $('.filter-options'),
      filterOptionsLi = $('.filter-options li'),
      filters = $('#filters li'),
      mask = $('#mask'),
      sortMask = $('#sort-mask'),
      sortTitle = $('#sort-title'),
      sortOptions = $('#sort-options'),
      sortOptionsLi = $('#sort-options li');
    filters.on('click', function() {
      sortOptions.hide();
      sortMask.hide();
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        filterOptions.hide();
        mask.hide();
      } else {
        filters.removeClass('active');
        $(this).addClass('active');
        filterOptions.hide();
        $('.' + $(this).attr('id') + '-options').show();
        mask.show();
      }
    });
    mask.on('click', function() {
      filterOptions.hide();
      filters.removeClass('active');
      mask.hide();
    });
    sortTitle.on('click', function() {
      sortOptions.show();
      sortMask.show();
    });
    sortMask.on('click', function() {
      sortOptions.hide();
      sortMask.hide();
    });
    filterOptionsLi.on('click', function() {
      filters.removeClass('active');
      filterOptions.hide();
      mask.hide();
      if (!$(this).hasClass('active')) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var a = $(this).parent().attr('data-param');
        $('#' + $(this).parent().attr('data-param')).find('span').text($(this).find('span').text());
      }
    });
    sortOptionsLi.on('click', function() {
      sortOptions.hide();
      sortMask.hide();
      if (!$(this).hasClass('selected')) {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
      }
    });
    $('body').on('touchstart', function() {
      mask.height($(this).height());
      sortMask.height($(this).height());
    });
  }
};
Fundlist.init();
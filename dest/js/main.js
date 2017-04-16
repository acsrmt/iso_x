$(document).ready(function() {
  //left side "filters"
  var sideslide = $('[data-toggle=collapse-side]');
  var collapsable = sideslide.attr('data-target');
  var catchbox = sideslide.attr('data-target-2');
  sideslide.click(function(event) {
    $(collapsable).toggleClass('in');
    $(catchbox).toggleClass('out');
    $('.touch-handler').toggleClass('overflow-hidden');
  });
  $(catchbox).click(function() {
    $(collapsable).toggleClass('in');
    $(catchbox).toggleClass('out');
    $('.touch-handler').toggleClass('overflow-hidden');
  });

  //touch/swipe actions for left side filters
  delete Hammer.defaults.cssProps.userSelect;
  var hammertime = new Hammer(document.querySelector('.touch-handler', {
    inputClass: Hammer.TouchInput
  }));
  var hammertime2 = new Hammer(document.querySelector('.side-collapse', {
    inputClass: Hammer.TouchInput
  }));
  hammertime.on('swiperight', function(ev) {
    $(collapsable).toggleClass('in');
    $(catchbox).toggleClass('out');
    $('.touch-handler').toggleClass('overflow-hidden');
  });
  hammertime2.on('swipeleft', function(ev) {
    $(collapsable).toggleClass('in');
    $(catchbox).toggleClass('out');
    $('.touch-handler').toggleClass('overflow-hidden');
  });


  //render serch results
  renderResults(goods, '#results-container');

  //listener for form inputs
  $('#filter-form input').on('change', function() {
    var filters = formState('#filter-form'); //collect filters
    filterGoods(goods, filters); //filtering results
    renderResults(goods, '#results-container'); //rendering results
  });
});



var goods = [{
    id: 1,
    name: 'A',
    brand: 'KNAUF',
    price: 100,
    url: 'http://placehold.it/200x100',
    hidden: false
  },
  {
    id: 2,
    name: 'B',
    brand: 'CYPROC',
    price: 200,
    url: 'http://placehold.it/200x100',
    hidden: false
  },
  {
    id: 3,
    name: 'C',
    brand: 'CYPROC',
    price: 200,
    url: 'http://placehold.it/200x100',
    hidden: false
  },
  {
    id: 4,
    name: 'D',
    brand: 'KNAUF',
    price: 200,
    url: 'http://placehold.it/200x100',
    hidden: false
  },
  {
    id: 5,
    name: 'D',
    brand: 'KNAUF',
    price: 400,
    url: 'http://placehold.it/200x100',
    hidden: false
  },
  {
    id: 6,
    name: 'F',
    brand: 'KNAUF',
    price: 200,
    url: 'http://placehold.it/200x100',
    hidden: false
  },
  {
    id: 7,
    name: 'D',
    brand: 'CYPROC',
    price: 500,
    url: 'http://placehold.it/200x100',
    hidden: false
  }
];

function renderResults(goods, appendContainer) {
  $(appendContainer + ' .wrap').remove();
  var results = [];
  for (var i = 0; i < goods.length; i++) {
    if (goods[i].hidden === false) {
      var results__item = $('<div class="col-12 col-md-6 mb-2 wrap"><div class="results__item"><ul class="results__desc-list"></ul></div></div>');
      $('.results__item', results__item).attr('data-id', goods[i].id);
      $('.results__item', results__item).prepend('<img class="img-fluid" src="' + goods[i].url + '">');
      $('.results__desc-list', results__item).append('<li>' + goods[i].name + '</li>');
      $('.results__desc-list', results__item).append('<li>' + goods[i].brand + '</li>');
      $('.results__desc-list', results__item).append('<li>' + goods[i].price + '</li>');
      results.push(results__item);
    }
  }

  $(appendContainer).append(results);
}

function formState(form) {
  var filterState = [];
  var inputs = $(form + ' input');
  for (var i = 0; i < inputs.length; i++) {
    var input = {
      type: inputs[i].type,
      name: inputs[i].name,
      value: inputs[i].value,
      checked: inputs[i].checked
    };
    filterState.push(input);
  }

  return filterState;
}

function filterGoods(goods, filters) {
  var minprice = 100,
    min = 100,
    maxprice = 1000,
    max = 1000,
    brands = [];
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].name == 'minprice' && filters[i].value) {
      minprice = filters[i].value >= min && filters[i].value <= max ? +filters[i].value : min;
    }
    if (filters[i].name == 'maxprice' && filters[i].value) {
      maxprice = filters[i].value >= min && filters[i].value <= max ? +filters[i].value : max;
    }
    if (minprice > maxprice) {
      var swap = minprice;
      minprice = maxprice;
      maxprice = swap;
    }

    if (filters[i].name == 'brand' && filters[i].checked) {
      brands.push(filters[i].value);
    }
  }

  for (i = 0; i < goods.length; i++) {
    goods[i].hidden = true;
    if (brands.length) {
      for (j = 0; j < brands.length; j++) {
        if (brands[j] == goods[i].brand) {
          goods[i].hidden = false;
        }
      }
    } else {
      goods[i].hidden = false;
    }

    if (!goods[i].hidden && (goods[i].price >= minprice && goods[i].price <= maxprice)) {
      goods[i].hidden = false;
    } else {
      goods[i].hidden = true;
    }
  }

  return goods;
}

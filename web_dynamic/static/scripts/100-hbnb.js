$(document).ready(function () {
  const searchData = { amenities: {}, states: {}, cities: {} };

  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      searchData[$(this).data('type')][$(this).data('id')] = $(this).data('name');
    } else {
      delete searchData[$(this).data('type')][$(this).data('id')];
    }
    const res = Object.values(searchData.amenities);
    if (res.length > 0) {
      $('div.amenities > h4').text(res.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status && data.status.toUpperCase() === 'OK') {
        $('#api_status').addClass('available');
      } else $('#api_status').removeClass('available');
    }
  });
  function loadPlaces (data = {}) {
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      type: 'POST',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        $('.places').empty();
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          $('.places ').append(`
  <article>
    <div class="title_box">
      <h2> ${place.name}</h2>
      <div class="price_by_night">
        <p>$ ${place.price_by_night}</p>
      </div>
    </div>
    <div class="information">
      <div class="max_guest">
        <div class="guest_image"></div>
        <p>${place.max_guest}</p>
      </div>
      <div class="number_rooms">
        <div class="bed_image"></div>
        <p>${place.number_rooms}</p>
      </div>
      <div class="number_bathrooms">
        <div class="bath_image"></div>
        <p>${place.number_bathrooms}</p>
      </div>
    </div>
    <div class="description">
      <p>${place.description}</p>
    </div>
  </article>`);
        }
      }
    });
  }
  loadPlaces(); // load the page for the first time

  $('button[type="button"]').click(function () {
    // reformat searchData to match requirement
    const search = {};
    let values = [];
    Object.keys(searchData).forEach(function (key) {
      const newValues = Object.keys(searchData[key]);
      if (newValues) search[key] = newValues;
      values = values.concat(newValues);
    });
    if (values.length !== 0) {
      loadPlaces(search);
    } else {
      loadPlaces();
    }
  });
});

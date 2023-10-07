$(document).ready(function () {
  const amenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const res = Object.values(amenities);
    if (res.length > 0) {
      $('div.amenities > h4').text(Object.values(amenities).join(', '));
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
  $.ajax({
     url: 'http://127.0.0.1:5001/api/v1/places_search',
     type: 'POST',
     data: '{}',
     dataType: 'json',
     contentType: 'application/json',
     success: function (data) {
       for (let i = 0; i < data.length; i++) {
	  let place = data[i];
	  $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + pl.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + pl.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + pl.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + pl.number_bathrooms + '</p></div></div><div class="description"><p>' + pl.description + '</p></div></article>');
      }
	  }
  });
});

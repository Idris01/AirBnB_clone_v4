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
});

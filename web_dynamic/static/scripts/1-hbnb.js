$(document).ready(function () {
  let amenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    let res = Object.values(amenities);
    if (res.length > 0) {
      $('div.amenities > h4').text(Object.values(amenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});

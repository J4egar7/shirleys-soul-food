/* Order page — builds a readable order summary (no submission) */
(function () {
  'use strict';

  var form = document.getElementById('orderForm');
  if (!form) return;
  var notice = document.getElementById('notice');

  /* visual state on the side chips */
  document.querySelectorAll('#sidePick .pick input').forEach(function (cb) {
    cb.addEventListener('change', function () {
      cb.closest('.pick').classList.toggle('checked', cb.checked);
    });
  });

  function val(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = (form.name.value || '').trim();
    var phone = (form.phone.value || '').trim();
    var time = form.pickup.value;
    var meat = val('meat');
    var sides = [];
    form.querySelectorAll('input[name="side"]:checked').forEach(function (cb) { sides.push(cb.value); });
    var dessert = val('dessert');
    var drink = val('drink');
    var notes = (form.notes.value || '').trim();

    var problems = [];
    if (!name) problems.push('add a name for the order');
    if (sides.length < 3) problems.push('pick at least three sides');

    if (problems.length) {
      notice.className = 'notice on';
      notice.innerHTML = '<h4>Almost there</h4><p>Please ' + problems.join(' and ') + '.</p>';
      notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var list = sides.map(function (s) { return '<li>' + s + '</li>'; }).join('');

    notice.className = 'notice on';
    notice.innerHTML =
      '<h4>Here is your plate, ' + name.split(' ')[0] + '</h4>' +
      '<p>This page does not send orders yet, so nothing has been placed. Read this to the cafe when you call:</p>' +
      '<ul>' +
        '<li><strong>Pickup:</strong> ' + time + '</li>' +
        '<li><strong>Plate:</strong> ' + meat + ' with ' + sides.length + ' sides</li>' +
        list +
        (dessert && dessert !== 'None' ? '<li><strong>Dessert:</strong> ' + dessert + '</li>' : '') +
        (drink ? '<li><strong>Drink:</strong> ' + drink + '</li>' : '') +
        (notes ? '<li><strong>Notes:</strong> ' + notes.replace(/</g, '&lt;') + '</li>' : '') +
        '<li><strong>Name:</strong> ' + name + (phone ? ' · ' + phone : '') + '</li>' +
      '</ul>' +
      '<p>Call <a href="tel:+17062977739">(706) 297-7739</a> to place it for real. Lunch runs 11:30am–2:00pm, Monday through Saturday.</p>';

    notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();

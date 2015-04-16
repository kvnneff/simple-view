var objectPath = require('mariocasciaro/object-path');
var Carry = require('yields/carry');
var Classes = require('component/classes');
var Domify = require('component/domify');
var attrs = {};

/**
* Expose `attrs`
*/
module.exports = attrs;

/**
* data-selected
*/

attrs.selected = function selected(el, key, model) {
  var value = objectPath.get(model, key);
  if (el.value == value) {
    el.setAttribute('selected', 'selected');
  } else {
    el.removeAttribute('selected');
  }
};

/**
* data-visible
*/

attrs.visible = function visible(el, key, model) {
  var value = objectPath.get(model, key);
  if (value) {
    Classes(el).add('visible').remove('hidden');
  } else {
    Classes(el).remove('visible').add('hidden');
  }
};

/**
* data-hidden
*/

attrs.hidden = function hidden(el, key, model) {
  var value = objectPath.get(model, key);
  if (value) {
    Classes(el).remove('visible').add('hidden');
  } else {
    Classes(el).add('visible').remove('hidden');
  }
};

/**
* data-checked
*/

attrs.checked = function checked(el, key, model) {
  var value = objectPath.get(model, key);
  if (value) {
    el.setAttribute('checked', 'checked');
  } else {
    el.removeAttribute('checked');
  }
};

/**
* data-append
*/

attrs.append = function append(el, key, model) {
  console.log(el);
  var other = objectPath.get(model, key);
  if (typeof other === "string") other = Domify(other);
  el.appendChild(other);
};

/**
* data-replace
*/

attrs.replace = function replace(el, key, model) {
  var other = Carry(objectPath.get(model, key), el);
  el.parentNode.replaceChild(other, el);
};

/**
* data-text
*/

attrs.text = function text(el, key, model) {
  var value = objectPath.get(model, key);
  if (el.tagName === 'TEXTAREA') return el.value = value;
  el.textContent = value;
};

/**
* data-html
*/

attrs.html = function html(el, key, model) {
  var value = objectPath.get(model, key);
  el.innerHTML = value;
};

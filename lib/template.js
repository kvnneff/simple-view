'use strict';
var Domify = require('component/domify');
var objectPath = require('mariocasciaro/object-path');
var Walk = require('anthonyshort/dom-walk');
var getAttribute = require('matthewp/attr');
var customAttrs = require('./custom');
var Template;

/**
* Attributes supported
*/

var attrs = [
  'id',
  'src',
  'rel',
  'cols',
  'rows',
  'name',
  'href',
  'title',
  'class',
  'style',
  'width',
  'value',
  'height',
  'tabindex',
  'placeholder'
];

/**
* Render `template` using `model`
* @param {Element|String} template
* @param {Object} model
* @api public
*/
Template = function Template(template, model) {
  if (typeof template === 'string') template = Domify(template);
  model = model || {};

  function renderCustomAttribute(el, attribute) {
    var key = getAttribute(el).get('data-' + attribute);
    var value = objectPath.get(model, key);
    if (key && value !== null && typeof value !== 'undefined') customAttrs[attribute](el, key, model);
  };

  function renderAttribute(el, attribute) {
    var key = getAttribute(el).get('data-' + attribute);
    var value = objectPath.get(model, key);
    if (key && value !== null && typeof value !== 'undefined') {
      if (!!~['INPUT', 'TEXTAREA'].indexOf(el.tagName) && attribute === 'value') {
        el.value = objectPath.get(model, key);
      }
      el.setAttribute(attribute, objectPath.get(model, key));
    }
  };

  Walk(template, function (el, next) {
    if (el.nodeType == 3 || el.nodeType == 8) return next();
    attrs.forEach(function (attribute) {
      renderAttribute(el, attribute);
    });

    for (var attribute in customAttrs) {
      renderCustomAttribute(el, attribute);
    }

    next();
  });

  return template;
};

/**
* Expose `Template`
*/
module.exports = Template;

var Nodes = require('staygrimm/node-list');
var Emitter = require('component/emitter');
var Events = require('component/event');
var Delegate = require('component/delegate');
var Domify = require('component/domify');
var Block = require('component/block');
var Walk = require('anthonyshort/dom-walk');
var templater = require('./template');
var View;

View = function View(template, model) {
  if (!(this instanceof View)) return new View(template, model);
  var self = this;
  this.children = {};
  this.model = model || {};
  this.template = template || '<div></div>';
  this.el = Domify(Block(this.template).render(this.model));
  this.nodes = {};
  this.render();
  this.events = [];
};

Emitter(View.prototype);

View.prototype.set = function set(attrs) {
  for (var key in attrs) {
    this.model[key] = attrs[key];
    this.emit('change ' + key, attrs[key]);
  }
  this.emit('change');
};

View.prototype.append = function append(view, el) {
  this.children[view.name] = view;
  el.appendChild(view.el);
};

View.prototype.render = function render() {
  var fragment = document.createDocumentFragment();
  var newEl;
  newEl = Domify(Block(this.template).render(this.model));
  newEl = templater(newEl, this.model);
  var parentEl = this.el.parentElement;
  if (parentEl) parentEl.replaceChild(newEl, this.el);
  this.el = newEl;
  this.nodes = Nodes(this.el);

};

View.prototype.update = function update() {
  this.el = templater(this.el, this.model);
  this.rebind();
}

View.prototype.rebind = function rebind() {
  var self = this;
  this.events.forEach(function(event) {
    var e = event;
    if (e.selector) {
      Delegate.bind(e.element, e.selector, e.method, e.fn, e.capture);
    } else {
      Events.bind(e.element, e.method, e.fn, e.capture);
    }
  });
};

View.prototype.bind = function bind(element, method, fn, capture) {
  if (typeof element === 'string') element = this.el.querySelector(element);
  Events.bind(element, method, fn, capture);
  this.events.push({
    element: element,
    method: method,
    fn: fn
  });
};

View.prototype.unbind = function unbind(element, method, fn, capture) {
  if (typeof element === 'string') element = this.el.querySelector(element);
  var events = this.events;
  Events.unbind(element, method, fn, capture);
  events.forEach(function (event, index) {
    if (element == element && method == method && fn == fn) {
      events.splice(index, 1);
    }
  });
};

View.prototype.delegate = function delegate(element, selector, method, fn, capture) {
  if (typeof element === 'string') element = this.el.querySelector(element);
  var cb = Delegate.bind(element, selector, method, fn, capture);
  this.events.push({
    element: element,
    selector: selector,
    method: method,
    fn: fn
  });
};

View.prototype.destroy = function destroy() {
  var parentEl = this.el.parentElement;
  if (parentEl) parentEl.removeChild(this.el);
  this.events.forEach(function (event) {
    Events.unbind(event.element, event.method, event.fn);
  });
};

module.exports = View;

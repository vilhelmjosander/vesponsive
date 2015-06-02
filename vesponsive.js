var Vesponsive = (function(root, undefined) {
  "use strict";
  // Private
  var _this;
  var toArray = Array.prototype.slice;
  var listener = window.addEventListener;

  function init(opts) {
    // Return if on old IE
    if('attachEvent' in window) {
      return false;
    }

    _this = this;
    _this.opts = opts;
    _this.elems = [];
    addListeners();
  };



  function addListeners() {
    // Listen
    listener('DOMContentLoaded', setElems);
    listener('resize', resizeHandler);
  };

  function setElems() {
    var elems = _this.opts.elems;

    elems.forEach(function(elem, i) {
      var node = DOM.getElem(elem.selector);
      var receiverNode = DOM.getElem(elem.receiverSelector);
      if(!node || !receiverNode) {
        return;
      }
      _this.elems.push({
        node:             Array.isArray(node) ? node[0] : node,
        breakPoint:       elem.breakpoint,
        receiver:         Array.isArray(receiverNode) ? receiverNode[0] : receiverNode,
        isMoved:          false,
        origPrevSibling:  elem.previousElementSibling,
        origParent:       elem.parentNode,
        priority:         i,
        DOMmethod:        elem.position,
        additionalClass:  elem.additionalClass
      });
    });
    // Set init positions
    resizeHandler();
  };

  function resizeHandler() {
    var elems = _this.elems;
    var width = window.innerWidth;

    elems.forEach(function(elem, i) {
      if(!elem.node || !elem.receiver) {

        return;
      }

      var breakPoint = parseInt( elem.breakPoint, 10);

      if( !elem.isMoved && width <= breakPoint ) {
        elem.isMoved = true;
        if(elem.additionalClass && elem.additionalClass.length) {
          DOM.addClass(elem.node, elem.additionalClass);
        }
        DOM[elem.DOMmethod](elem.receiver, elem.node);
      } else if( elem.isMoved && width > breakPoint ) {
        elem.isMoved = false;
        if(elem.origPrevSibling) {
          DOM.insertAfter(elem.origPrevSibling, elem.node);
        } else {
          DOM.prependChild(elem.origParent, elem.node);
        }
        if(elem.additionalClass && elem.additionalClass.length) {
          DOM.removeClass(elem.node, elem.additionalClass);
        }
      }
    });
  }

  // Helpers
  var DOM = {
    /*
    * Returns the DOM-node based on selector
    */
    getElem: function(selector) {
      if(~selector.indexOf('#') && !~selector.indexOf('>')) {
        return document.getElementById(selector.substr(1));
      } else {
        return toArray.call(document.querySelectorAll(selector)) || [];
      }
    },

    /*
    * Append newNode into referenceNode
    */
    append: function(referenceNode, newNode) {
      referenceNode.appendChild(newNode);
    },

    /*
    * Perpend newNode into referenceNode
    */
    prepend: function(referenceNode, newNode) {
        referenceNode.insertBefore( newNode, referenceNode.firstChild);
    },

    /*
    * Insert newNode after referenceNode
    */
    after: function(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },

    /*
    * Insert newNode before referenceNode
    */
    before: function(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode);
    },

    addClass: function(node, name) {
      if(node.className.indexOf(name) !== -1) {
        return;
      }
      var pre = node.className.length > 0 ? ' ' : '';
      node.className += pre + name;
    },

    removeClass: function(node, name) {
      node.className = node.className.replace(name, '');
    }
  };

  // Public
  return {
    init: init,
    version: '1.0'
  };

})(window);
(function() {
  'use strict';

  window.APP = {};

  // define Modal window inside APP object
  APP.Modal = function() {

    // global variables
    this.closeBtn = null;
    this.openBtn = null;
    this.overlay = null;

    // effects
    this.effects = {
      slideFromLeft : 'modal-effect-1'
    }

    // defaults
    var defaults = {
      containerClass: 'modal-window',
      closeBtn: true,
      overlay: true,
      overlayClassOpen: 'modal-window-overlay--open',
      overlayClass: 'modal-window-overlay',
      closeBtnClass: 'btn btn-modal--close',
      openBtnClass: 'btn btn-modal--open',
      effect: this.effects.slideRight
    };

    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = APP.extendDefaults(defaults, arguments[0]);
    }
  };

  // open window
  APP.Modal.prototype.open = function(e) {
    (e.preventDefault) ? e.preventDefault() : e.returnValue = false;

    var modal = document.querySelector('.'+this.options.containerClass),
        overlay = document.querySelector('.'+this.options.overlayClass);
    overlay.className = this.options.overlayClass + ' ' + this.options.overlayClassOpen;
    modal.className = this.options.containerClass + ' ' + this.effects[this.options.effect] + ' ' + 'modal-window--open';
  };

  // close window
  APP.Modal.prototype.close = function() {
    var modal = document.querySelector('.'+this.options.containerClass),
        overlay = document.querySelector('.'+this.options.overlayClass);
    overlay.className = overlay.className.replace(' '+this.options.overlayClassOpen, '');
    modal.className = modal.className.replace(' modal-window--open', '');
  };

  // initialize window
  APP.Modal.prototype.init = function() {
    APP.buildModal.call(this);
    var IEcheck = window.addEventListener ? true : false;

    // if overlay is true
    if (this.overlay) {
      if (IEcheck) {
        this.overlay.addEventListener('click', this.close.bind(this));
      } else {
        this.overlay.attachEvent('onclick', this.close.bind(this));
      }
    }
    // if overlay is true
    if (this.closeBtn) {
      if (IEcheck) {
        this.closeBtn.addEventListener('click', this.close.bind(this));
      } else {
        this.closeBtn.attachEvent('onclick', this.close.bind(this));
      }
    }
    if (IEcheck) {
      this.openBtn.addEventListener('click', this.open.bind(this));
    } else {
      this.openBtn.attachEvent('onclick', this.open.bind(this));
    }
  };

  // extend defaults
  APP.extendDefaults = function(source, object) {
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        source[property] = object[property];
      }
    }
    return source;
  };

  // build elements of modal window
  APP.buildModal = function() {
    var container = document.querySelector('.'+this.options.containerClass);
    container.className += ' ' + this.effects[this.options.effect];

    if (this.options.overlay === true) {
      this.overlay = document.createElement('div');
      this.overlay.className = this.options.overlayClass;
      document.body.appendChild(this.overlay);
    }

    if (this.options.closeBtn === true) {
      this.closeBtn = document.createElement('button');
      this.closeBtn.className = this.options.closeBtnClass;
      this.closeBtn.innerHTML = 'X';
      container.appendChild(this.closeBtn);
    }

    var classButtonSplit = this.options.openBtnClass.split(' ').join('.');
    this.openBtn = document.querySelector('.'+classButtonSplit);
  }
})();

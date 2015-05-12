(function ($) {

  function ZoomToo(element, options) {
    var zoomToo = this;

    zoomToo.element = element;
    zoomToo.load(options);
  }

  ZoomToo.defaults = {
    showDuration: 500,
    moveDuration: 1200,
    magnify: 1,
    lensWidth: 200,
    lensHeight: 200
  };

  ZoomToo.prototype = {
    load: function(options) {
      var zoomToo = this,
        nestedImage = zoomToo.element.find("img").first(),
        img_src = nestedImage.data("src");
      zoomToo.element.one("zoomtoo.destroy", $.proxy(zoomToo.destroy, zoomToo));
      if (!img_src) {
        return;
      }
      zoomToo.img = new Image();
      zoomToo.img.src = img_src;
      zoomToo.img.onload = $.proxy(zoomToo.init, zoomToo, options);
    },
    init: function(options) {
      var zoomToo = this,
        position = zoomToo.element.css("position");

      zoomToo.settings = $.extend({}, ZoomToo.defaults, options);

      zoomToo.element.get(0).style.position = /(absolute|fixed)/.test(position) ? position : "relative";
      zoomToo.element.get(0).style.overflow = "hidden";

      zoomToo.elementWidth = zoomToo.element.outerWidth();
      zoomToo.elementHeight = zoomToo.element.outerHeight();

      zoomToo.imgWidth = zoomToo.img.width * zoomToo.settings.magnify;
      zoomToo.imgHeight = zoomToo.img.height * zoomToo.settings.magnify;

      zoomToo.elementOffset = zoomToo.element.offset();

      zoomToo.newZoom = { left: 0, top: 0 };
      zoomToo.currentZoom = { left: 0, top: 0 };
      zoomToo.moveImageTimer = 0;
      zoomToo.continueSlowMove = false;

      $(zoomToo.img)
        .css({
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          width: zoomToo.imgWidth,
          height: zoomToo.imgHeight,
          border: "none",
          maxWidth: "none",
          maxHeight: "none"
        })
        .appendTo(zoomToo.element);

      zoomToo.element
        .css({ cursor: "crosshair" })
        .on("mouseenter.zoomtoo", $.proxy(zoomToo.mouseEnter, zoomToo))
        .on("mouseleave.zoomtoo", $.proxy(zoomToo.mouseLeave, zoomToo))
        .on("mousemove.zoomtoo", $.proxy(zoomToo.mouseMove, zoomToo));
    },
    destroy: function() {
      var zoomToo = this;
      zoomToo.cancelTimer();
      zoomToo.element.off();
      $(zoomToo.img).remove();
      zoomToo.element.removeData("zoomtoo");
    },
    calculateOffset: function(currentMousePos) {
      var zoomToo = this;

      var currentMouseOffsetX = currentMousePos.x - zoomToo.elementOffset.left,
        currentMouseOffsetY = currentMousePos.y - zoomToo.elementOffset.top,
        halfLensHeight = Math.round(zoomToo.settings.lensHeight / 2),
        halfLensWidth = Math.round(zoomToo.settings.lensWidth / 2),
        lensTop = currentMouseOffsetY - halfLensHeight,
        lensBottom = currentMouseOffsetY + halfLensHeight,
        lensLeft = currentMouseOffsetX - halfLensWidth,
        lensRight = currentMouseOffsetX + halfLensWidth;

      if (lensTop < 0) {
        currentMouseOffsetY = halfLensHeight;
      }
      if (lensBottom > zoomToo.elementHeight) {
        currentMouseOffsetY = zoomToo.elementHeight - halfLensHeight;
      }
      if (lensLeft < 0) {
        currentMouseOffsetX = halfLensWidth;
      }
      if (lensRight > zoomToo.elementWidth) {
        currentMouseOffsetX = zoomToo.elementWidth - halfLensWidth;
      }

      var deltaHeight = zoomToo.imgHeight - zoomToo.elementHeight;
      var adjustedHeight = zoomToo.elementHeight - zoomToo.settings.lensHeight;

      var deltaWidth = zoomToo.imgWidth - zoomToo.elementWidth;
      var adjustedWidth = zoomToo.elementWidth - zoomToo.settings.lensWidth;

      var zoomTop = (-deltaHeight/adjustedHeight) * (currentMouseOffsetY - halfLensHeight);
      var zoomLeft = (-deltaWidth/adjustedWidth) * (currentMouseOffsetX - halfLensWidth);

      zoomToo.newZoom.left = zoomLeft;
      zoomToo.newZoom.top = zoomTop;
    },
    cancelTimer: function() {
      var zoomToo = this;
      clearTimeout(zoomToo.moveImageTimer);
    },
    stopSlowMoveImage: function() {
      var zoomToo = this;
      zoomToo.continueSlowMove = false;
    },
    mouseLeave: function() {
      var zoomToo = this;
      $(zoomToo.img).stop().fadeTo(zoomToo.settings.showDuration, 0).promise().done(zoomToo.stopSlowMoveImage);
    },
    mouseEnter: function(e) {
      var zoomToo = this,
        currentMousePos = {
          x: e.pageX,
          y: e.pageY
        };
      zoomToo.calculateOffset(currentMousePos);
      zoomToo.continueSlowMove = true;
      zoomToo.currentZoom.top = zoomToo.newZoom.top;
      zoomToo.currentZoom.left = zoomToo.newZoom.left;
      zoomToo.moveImage();
      $(zoomToo.img).stop().fadeTo(zoomToo.settings.showDuration, 1);
    },
    mouseMove: function (e) {
      var zoomToo = this,
        currentMousePos = {
          x: e.pageX,
          y: e.pageY
        };
      zoomToo.calculateOffset(currentMousePos);
      zoomToo.cancelTimer();
      zoomToo.continueSlowMove = true;
      zoomToo.slowMoveImage();
    },
    slowMoveImage: function () {
      var zoomToo = this,
        delta = { left: 0, top: 0 },
        moveZoomPos = { left: 0, top: 0},
        reachedLeft = false,
        reachedTop = false;

      delta.left = zoomToo.newZoom.left - zoomToo.currentZoom.left;
      delta.top = zoomToo.newZoom.top - zoomToo.currentZoom.top;

      moveZoomPos.left = -delta.left / (zoomToo.settings.moveDuration / 100);
      moveZoomPos.top = -delta.top / (zoomToo.settings.moveDuration / 100);

      zoomToo.currentZoom.left = zoomToo.currentZoom.left - moveZoomPos.left;
      zoomToo.currentZoom.top = zoomToo.currentZoom.top - moveZoomPos.top;

      if (Math.abs(delta.left) < 1) {
        zoomToo.currentZoom.left = zoomToo.newZoom.left;
        reachedLeft = true;
      }
      if (Math.abs(delta.top) < 1) {
        zoomToo.currentZoom.top = zoomToo.newZoom.top;
        reachedTop = true;
      }

      zoomToo.moveImage();

      if (reachedLeft && reachedTop) {
        zoomToo.continueSlowMove = false;
      }

      if (zoomToo.continueSlowMove === true) {
        zoomToo.moveImageTimer = setTimeout($.proxy(zoomToo.slowMoveImage, zoomToo), 25);
      }
    },
    moveImage: function() {
      var zoomToo = this;
      zoomToo.img.style.left = (zoomToo.currentZoom.left) + "px";
      zoomToo.img.style.top = (zoomToo.currentZoom.top) + "px";
    }
  };

  $.fn.zoomToo = function (options) {
    this.each(function () {
      var instance = $.data(this, "zoomtoo");
      if (!instance) {
        $.data(this, "zoomtoo", new ZoomToo($(this), options));
      }
    });
  };

}(window.jQuery));

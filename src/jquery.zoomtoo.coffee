(($) ->

	ZoomToo = (element, options) ->
		@element = element
		@load(options)
		return

	ZoomToo.defaults =
		showDuration: 500
		moveDuration: 1200
		magnify: 1
		lensWidth: 200
		lensHeight: 200

	ZoomToo.prototype =
		load: (options) ->
			nestedImage = @element.find("img").first()
			img_src = nestedImage.data("src")
			@element.one "zoomtoo.destroy", $.proxy(@destroy, @)
			return unless img_src
			@mouseOnElement = false
			@imgLoaded = false
			@img = new Image()
			@img.src = img_src
			@img.onload = $.proxy(@initImage, @)
			@element.css(cursor: "wait")
			@init(options)
			return

		initImage: ->
			@imgLoaded = true
			oldWidth = @imgWidth
			oldHeight = @imgHeight
			@imgWidth = @img.naturalWidth * @settings.magnify
			@imgHeight = @img.naturalHeight * @settings.magnify
			@currentZoom.left = @currentZoom.left - ((@imgWidth - oldWidth)/2)
			@currentZoom.top = @currentZoom.top - ((@imgHeight - oldHeight)/2)
			$(@img).css(width: @imgWidth, height: @imgHeight)

			@element.css(cursor: "crosshair")
			if @mouseOnElement
				@fadeInImage()
			return

		init: (options) ->
			position = @element.css("position")
			@settings = $.extend({}, ZoomToo.defaults, options)
			@element.get(0).style.position = if /(absolute|fixed)/.test(position) then position else "relative"
			@element.get(0).style.overflow = "hidden"
			@elementWidth = @element.outerWidth()
			@elementHeight = @element.outerHeight()
			@imgWidth = @elementWidth
			@imgHeight = @elementHeight
			@elementOffset = @element.offset()
			@newZoom =
				left: 0
				top: 0
			@currentZoom =
				left: 0
				top: 0
			@moveImageTimer = 0
			@continueSlowMove = false
			@prepareElements()
			return

		prepareElements: ->
			$(@img).css(
				position: "absolute"
				top: 0
				left: 0
				opacity: 0
				width: @imgWidth
				height: @imgHeight
				border: "none"
				maxWidth: "none"
				maxHeight: "none").appendTo @element
			@element
				.on("mouseenter.zoomtoo", $.proxy(@mouseEnter, @))
				.on("mouseleave.zoomtoo", $.proxy(@mouseLeave, @))
				.on "mousemove.zoomtoo", $.proxy(@mouseMove, @)
			return

		destroy: ->
			@cancelTimer()
			@element.off()
			$(@img).remove()
			@element.removeData "zoomtoo"
			return

		calculateOffset: (currentMousePos) ->
			currentMouseOffsetX = currentMousePos.x - (@elementOffset.left)
			currentMouseOffsetY = currentMousePos.y - (@elementOffset.top)

			halfLensHeight = Math.round(@settings.lensHeight / 2)
			halfLensWidth = Math.round(@settings.lensWidth / 2)

			lensTop = currentMouseOffsetY - halfLensHeight
			lensBottom = currentMouseOffsetY + halfLensHeight
			lensLeft = currentMouseOffsetX - halfLensWidth
			lensRight = currentMouseOffsetX + halfLensWidth

			if lensTop < 0
				currentMouseOffsetY = halfLensHeight

			if lensBottom > @elementHeight
				currentMouseOffsetY = @elementHeight - halfLensHeight

			if lensLeft < 0
				currentMouseOffsetX = halfLensWidth

			if lensRight > @elementWidth
				currentMouseOffsetX = @elementWidth - halfLensWidth

			deltaHeight = @imgHeight - (@elementHeight)
			adjustedHeight = @elementHeight - (@settings.lensHeight)

			deltaWidth = @imgWidth - (@elementWidth)
			adjustedWidth = @elementWidth - (@settings.lensWidth)

			zoomTop = -deltaHeight / adjustedHeight * (currentMouseOffsetY - halfLensHeight)
			zoomLeft = -deltaWidth / adjustedWidth * (currentMouseOffsetX - halfLensWidth)

			@newZoom.left = zoomLeft
			@newZoom.top = zoomTop

			return

		cancelTimer: ->
			clearTimeout @moveImageTimer
			return

		stopSlowMoveImage: ->
			@continueSlowMove = false
			return

		mouseLeave: ->
			@mouseOnElement = false
			$(@img).stop().fadeTo(@settings.showDuration, 0).promise().done @stopSlowMoveImage
			return

		mouseEnter: (e) ->
			@mouseOnElement = true
			currentMousePos =
				x: e.pageX
				y: e.pageY
			@calculateOffset currentMousePos
			@continueSlowMove = true
			@currentZoom.top = @newZoom.top
			@currentZoom.left = @newZoom.left
			@moveImage()
			if @imgLoaded
				@fadeInImage()
			return

		fadeInImage: ->
			$(@img).stop().fadeTo @settings.showDuration, 1
			return

		mouseMove: (e) ->
			currentMousePos =
				x: e.pageX
				y: e.pageY
			@calculateOffset currentMousePos
			@cancelTimer()
			@continueSlowMove = true
			@slowMoveImage()
			return

		slowMoveImage: ->
			delta =
				left: 0
				top: 0
			moveZoomPos =
				left: 0
				top: 0
			reachedLeft = false
			reachedTop = false

			delta.left = @newZoom.left - (@currentZoom.left)
			delta.top = @newZoom.top - (@currentZoom.top)

			moveZoomPos.left = -delta.left / (@settings.moveDuration / 100)
			moveZoomPos.top = -delta.top / (@settings.moveDuration / 100)

			@currentZoom.left = @currentZoom.left - (moveZoomPos.left)
			@currentZoom.top = @currentZoom.top - (moveZoomPos.top)

			if Math.abs(delta.left) < 1
				@currentZoom.left = @newZoom.left
				reachedLeft = true

			if Math.abs(delta.top) < 1
				@currentZoom.top = @newZoom.top
				reachedTop = true

			@moveImage()

			if reachedLeft and reachedTop
				@continueSlowMove = false

			if @continueSlowMove == true
				@moveImageTimer = setTimeout($.proxy(@slowMoveImage, @), 25)

			return

		moveImage: ->
			@img.style.left = @currentZoom.left + "px"
			@img.style.top = @currentZoom.top + "px"
			return

	$.fn.zoomToo = (options) ->
		@each ->
			instance = $.data(this, "zoomtoo")
			if !instance
				$.data this, "zoomtoo", new ZoomToo($(this), options)
			return
		return

	return

) (window.jQuery)

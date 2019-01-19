(function() {

	var sigBox = document.getElementById("signatureBox");


		//-------------------------------------------------------------------------------------------//
		// ADD SIGNATURE BOX TO DOM -----------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//
		sigBox.innerHTML = "<div id=\"sigContainer\"><canvas id=\"signature\" width=\"320\" height=\"120\">Your browser does not support HTML5 canvas. </canvas> <a href=\"\" id=\"saveSignature\">Save Signature</a> <a href=\"\" id=\"clearSignature\">Clear Signature</a></div>"

 	// CONSTRUCTOR
	this.signatureBox = function() {
	
		//-------------------------------------------------------------------------------------------//
		// VARIABLES --------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		var canvas = document.getElementById("signature");
			ctx = canvas.getContext("2d");
			drawFlag = false,
			mousePosition = { x: 0, y: 0 },
			lastMousePosition = mousePosition,
			boundingRectangle = canvas.getBoundingClientRect();
			
		

		//-------------------------------------------------------------------------------------------//
		// SIGNATURE LINE ---------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function ink() {
			this.width = 4;
			this.color = "#666666";
			this.lineCap = "round";
		}

		ink.prototype.drawInk = function() {
			ctx.lineWidth = this.width;
			ctx.strokeStyle = this.color;
			ctx.lineCap = this.lineCap;
			ctx.moveTo(lastMousePosition.x, lastMousePosition.y);
			ctx.lineTo(mousePosition.x, mousePosition.y);
			ctx.stroke();
			lastMousePosition = mousePosition;
		}

		var ink = new ink();

		//-------------------------------------------------------------------------------------------//
		// MOUSE POSITION ---------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function getMousePosition(c, mouseEvent) {
		  return {
			x: mouseEvent.clientX - boundingRectangle.left,
			y: mouseEvent.clientY - boundingRectangle.top
		  };
		}

		//-------------------------------------------------------------------------------------------//
		// TOUCH POSITION ---------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function getTouchPosition(c, touchEvent) {
		  return {
			x: touchEvent.touches[0].clientX - boundingRectangle.left,
			y: touchEvent.touches[0].clientY - boundingRectangle.top
		  };
		}

		//-------------------------------------------------------------------------------------------//
		// EVENT LISTENERS - MOUSE ------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		canvas.addEventListener("mousedown", function(e) {
			drawFlag = true;
			lastMousePosition = getMousePosition(canvas, e);
		}, false);

		canvas.addEventListener("mouseup", function(e) {
		  drawFlag = false;
		}, false);

		canvas.addEventListener("mousemove", function(e) {
		  mousePosition = getMousePosition(canvas, e);
		}, false);

		//-------------------------------------------------------------------------------------------//
		// TOUCH EVENTS - TOUCH ---------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		canvas.addEventListener("touchstart", function(e) {
			mousePosition = getTouchPosition(canvas, e);
		  var touch = e.touches[0];
		  var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		  });
		  canvas.dispatchEvent(mouseEvent);
		}, false);

		canvas.addEventListener("touchend", function(e) {
		  var mouseEvent = new MouseEvent("mouseup", {});
		  canvas.dispatchEvent(mouseEvent);
		}, false);

		canvas.addEventListener("touchmove", function(e) {
		  var touch = e.touches[0];
		  var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		  });
		  canvas.dispatchEvent(mouseEvent);
		}, false);

		// NO SCROLL ON TOUCH
		document.body.addEventListener("touchstart", function(e) {
		  if (e.target == canvas) {
			e.preventDefault();
		  }
		}, false);

		// NO SCROLL ON TOUCH
		document.body.addEventListener("touchend", function(e) {
		  if (e.target == canvas) {
			e.preventDefault();
		  }

		}, false);

		// NO SCROLL ON TOUCH
		document.body.addEventListener("touchmove", function(e) {
		  if (e.target == canvas) {
			e.preventDefault();
		  }
		}, false);

		//-------------------------------------------------------------------------------------------//
		// CLEAR CANVAS -----------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function clearCanvas(a) {
			a.clearRect(0, 0, canvas.width, canvas.height);
		}

		//-------------------------------------------------------------------------------------------//
		// CLEAR SIGNATURE --------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//
		
		var clearSig = document.getElementById("clearSignature");
		clearSig.onclick = clearSignature;
		
		function clearSignature() {
			clearCanvas(ctx);
		}

		//-------------------------------------------------------------------------------------------//
		// SAVE SIGNATURE ---------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//
		
		var saveSig = document.getElementById("saveSignature");
		saveSig.onclick = saveSignatureLink;

		function saveSignatureLink() {

			var x = document.getElementById("signature");
			    y = x.toDataURL("image/png");
			// SIGNATURE IS EMPTY
			if(y.length > 1302) {
	 			var link = document.getElementById('saveSignature');
 				link.setAttribute('download', 'YourSignature.png');
 				link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
 			}
		}

		//-------------------------------------------------------------------------------------------//
		// RENDER -----------------------------------------------------------------------------------//
		//-------------------------------------------------------------------------------------------//

		function render() {
			if (drawFlag) {
				ink.drawInk();
				lastMousePosition = mousePosition;
			}
			//requestAnimationFrame(render);
			setTimeout(render, 1000 / 30);
		}

		render();
	
	} // END CONSTRUCTOR
	
}());

var signatureBox = new signatureBox();
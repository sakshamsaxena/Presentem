/*
Licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0)
License in layman language:
You are free to "share" and "adapt" this material for any purpose, even commercially, under the conditions that you must give aprropriate credit to the author (Saksham Saxena [https://github.com/sakshamsaxena]) and you must not put any additional restrictions.
*/

//Begin closure
(function ($) {
	"use strict";
	var i, imgsNumber = 0,
		marginC = parseFloat(20/1366),
		imgsStackT = [],
		curPath = (window.location.href).substring(0, (window.location.href).lastIndexOf("/") + 1),
		approach = 0,
		leftC = '<svg id="presentem-ctrl-prev" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 14 14" xml:space="preserve"><polygon points="11.949,3.404 7,8.354 2.05,3.404 -0.071,5.525 7,12.596 14.07,5.525 "/></svg>',
		rightC = '<svg id="presentem-ctrl-next" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 14 14" xml:space="preserve"><polygon points="11.949,3.404 7,8.354 2.05,3.404 -0.071,5.525 7,12.596 14.07,5.525 "/></svg>',
		crossC = '<svg version="1.1" id="presentem-ctrl-close" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 14 14" xml:space="preserve"><polygon points="14,3 11,0 7,4 3,0 0,3 4,7 0,11 3,14 7,10 11,14 14,11 10,7 "/></svg>';

	/*Plugin definition START************************************************************/
	$.fn.presentem = function (options) {

		var opts = $.extend({
			fHeight: "500",
			fWidth: "500"
		}, options);
		var AR = parseFloat(opts.fWidth / opts.fHeight);
		var actualSize;
		if (window.innerWidth <= 768) {
			actualSize = {
				fWidth: parseFloat(0.85 * window.innerWidth),
				fHeight: parseFloat(0.85 * window.innerWidth / AR)
			};
		} else {
			actualSize = opts;
		}

		//Stack HQ images
		this.each(function () {
			var elem = $(this),
				testApproach = elem.data("hqimg");
			if (elem.is("img")) {
				if (testApproach && urlExists(curPath + testApproach)) {
					imgsStackT.push(curPath + testApproach);
					approach = 2;
				}
			}
		});

		//Call gallery
		setupGallery(approach, actualSize);

		/*Core event binders*****************************************************************/

		//Kill gallery on clicking elsewhere
		$("div.presentem-wall").click(function () {
			killGallery();
		});
		$("div.presentem-wall").children().click(function (e) {
			e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
		});

		//Kill gallery on pressing of Esc key
		$(document).keyup(function (e) {
			if (e.keyCode === 27 || e.which === 27) {
				killGallery();
			}
		});

		//Kill gallery on clicking Close button
		$("#presentem-ctrl-close").click(function () {
			killGallery();
		});

		//Readjust frame on window resize
		$(window).resize(function () {
			newPos(opts);
		});

	};
	/************************************************************************************/

	/*Function to check if the recorded urls exist or not********************************/
	function urlExists(url) {
		var http = new XMLHttpRequest();
		http.open('HEAD', url);
		http.send();
		if (http.status !== 404) {
			imgsNumber++;
			return true;
		} else {
			return false;
		}
	}
	/************************************************************************************/

	/*Function to kill gallery***********************************************************/
	function killGallery() {
		var w = $(".presentem-wall");
		if (w.length) {
			w.fadeOut(800);
			w.queue(function () {
				w.remove();
				w.dequeue();
			});
		} else {
			return;
		}
	}
	/************************************************************************************/

	/*Resize handling********************************************************************/
	function newPos(actualSize) {
		var bW = document.body.getBoundingClientRect().width,
			bH = document.body.getBoundingClientRect().height,
			obj = {
				wallH: bH,
				wallW: bW,
				offset: (bW - actualSize.fWidth) / 2 - marginC + "px",
				caratH: 40 + (actualSize.fHeight / 2) + "px"
			};
		$("#presentem-ctrl-next,#presentem-ctrl-prev").css("top", obj.caratH);
		$("#presentem-ctrl-next").css("right", obj.offset);
		$("#presentem-ctrl-prev").css("left", obj.offset);
	}
	/************************************************************************************/

	/*Function to show the gallery wall**************************************************/
	function setupGallery(approach, actualSize) {
		//Setting up wall
		if (approach == 2) {
			$("body")
				.append("<div class='presentem-wall'></div>");
			$("div.presentem-wall")
				.css("height", window.innerHeight + "px")
				.append("<div class='presentem-frame'></div>")
				.append(crossC)
				.append(leftC)
				.append(rightC);

			//Preload first image and call gallery
			$.ajax({
				url: imgsStackT[0],
				beforeSend: function () {
					$("body").append("<div class='presentem-loader'></div>");
				},
				complete: function () {
					tradGallery(actualSize);
					$(".presentem-loader").remove();
				}
			});

		}
	}
	/************************************************************************************/

	/*Boom boom! Shake the room!*********************************************************/
	function tradGallery(actualSize) {
		//Set new CSS values
		newPos(actualSize);

		//Theatricals
		$("div.presentem-wall")
			.animate({
				opacity: 1
			}, {
				duration: 800,
				queue: true
			})
			.queue(function () {
				$("div.presentem-frame")
					.animate({
						height: actualSize.fHeight + "px"
					}, {
						duration: 800,
						queue: true
					})
					.animate({
						width: actualSize.fWidth + "px"
					}, {
						duration: 800,
						queue: true
					});
				$(this).dequeue();
			})
			.delay(1600)
			.queue(function () {
				$("#presentem-ctrl-prev")
					.animate({
						opacity: "1"
					}, {
						duration: 800,
						queue: false
					});
				$(this).dequeue();
			})
			.queue(function () {
				$("#presentem-ctrl-next")
					.animate({
						opacity: "1"
					}, {
						duration: 800,
						queue: false
					});
				$(this).dequeue();
			})
			.queue(function () {
				$("#presentem-ctrl-close")
					.animate({
						opacity: "1"
					}, {
						duration: 800,
						queue: false
					});
				$(this).dequeue();
			});

		//Time to get the images
		$("div.presentem-frame")
			.append("<img id='presentem-curr-img' src='" + imgsStackT[0] + "' width=100%>");

		//Controls
		$("#presentem-ctrl-next").click(function () {
			for (i = 0; i < imgsNumber; i++) {
				if ($("#presentem-curr-img").attr("src") === (imgsStackT[i])) {
					break;
				}
			}
			if (i + 1 >= imgsNumber) {
				i = -1;
			}

			$.ajax({
				url: imgsStackT[i + 1],
				beforeSend: function () {
					$(".presentem-wall").append("<div class='presentem-loader'></div>");
				},
				complete: function () {
					$("#presentem-curr-img").fadeOut(400, function () {
						$(this).attr("src", imgsStackT[i + 1]).fadeIn();
					});
					$(".presentem-loader").remove();
				}
			});
		});
		$("#presentem-ctrl-prev").click(function () {
			for (i = 0; i < imgsNumber; i++) {
				if ($("#presentem-curr-img").attr("src") === (imgsStackT[i])) {
					break;
				}
			}
			if (i - 1 < 0) {
				i = imgsNumber;
			}

			$.ajax({
				url: imgsStackT[i - 1],
				beforeSend: function () {
					$(".presentem-wall").append("<div class='presentem-loader'></div>");
				},
				complete: function () {
					$("#presentem-curr-img").fadeOut(400, function () {
						$(this).attr("src", imgsStackT[i - 1]).fadeIn();
					});
					$(".presentem-loader").remove();
				}
			});
		});
	}
	/************************************************************************************/


	//End closure
}(jQuery));
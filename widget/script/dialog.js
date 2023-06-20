(function(window, undefined) {
	"use strict";
	var Dialog = function() {};
	var isShow = false;
	var inputText = '';
	Dialog.prototype = {
		create: function(callback) {
			var self = this;
			var dialogHtml = '';
			var buttonsHtml = '';
			var headerHtml = '<div class="dialog-header">请输入数量</div>'
			var msgHtml = '<div class="dialog-body"><input id="inputDiv" value="'+inputText+'" maxlength = "5"  type="tel"  placeholder="请输入数量"></div>';
			var buttonsHtml ='<div class="dialog-btn" tapmode button-index="0">确定</div>';
			var footerHtml = '<div class="dialog-footer">' + buttonsHtml + '</div>';
			var closeHtml = '<div class="closeBtn"></div>';
			dialogHtml = '<div class="dialog">'+ closeHtml + headerHtml + msgHtml + footerHtml  +'</div>';
			document.body.insertAdjacentHTML('beforeend', dialogHtml);
			// listen buttons click
			var dialogImg = document.querySelector('.dialog-img');
			// dialogImg.onclick = function() {
			// 	dialogImg.src = 'http://music.163.com/captcha?id=esiIQVcebr6KfBrNqI1tNZ9f'
			// }

			console.log();
			var dialogButton = document.querySelector(".dialog-btn");
			dialogButton.onclick = function() {
				if (!document.querySelector("#inputDiv").value || document.querySelector("#inputDiv").value.length <= 0) {
					return;
				}

				(callback && typeof(callback) === "function") && callback({valus: document.querySelector("#inputDiv").value});
				self.close();

				console.log(4444444);

				return;
			}

			self.open();
		},
		open: function() {
			if(!document.querySelector(".dialog")) return;
			console.log(23424234);

			var self = this;
			document.querySelector(".dialog").style.marginTop = "-" + Math.round(document.querySelector(".dialog").offsetHeight / 2) + "px";
			if(!document.querySelector(".mask")) {
				var maskHtml = '<div class="mask"></div>';
				document.body.insertAdjacentHTML('beforeend', maskHtml);
			}
			// document.querySelector(".dialog").style.display = "block";
			setTimeout(function() {
				document.querySelector(".dialog").classList.add("dialog-in");
				document.querySelector(".mask").classList.add("mask-in");
			}, 10)
			document.querySelector(".mask").addEventListener("touchmove", function(e) {
				e.preventDefault();
			})
			document.querySelector(".dialog").addEventListener("touchmove", function(e) {
				e.preventDefault();
			})

			document.querySelector(".closeBtn").addEventListener("click", function(e) {
				self.close();
				e.preventDefault();
			});

			document.querySelector("#inputDiv").addEventListener("keyup", function(e) {
				this.value = this.value.replace(/[^\d]/g,'');
			});

			document.querySelector("#inputDiv").addEventListener("afterpaste", function(e) {
				this.value=this.value.replace(/\D/g,'');
			})
			return;
		},
		close: function() {
			var self = this;
			document.querySelector(".mask").classList.remove("mask-in");
			document.querySelector(".dialog").classList.remove("dialog-in");
			document.querySelector(".dialog").classList.add("dialog-out");
			if(document.querySelector(".dialog:not(.dialog-out)")) {
				setTimeout(function() {
					if(document.querySelector(".dialog")) document.querySelector(".dialog").parentNode.removeChild(document.querySelector(".dialog"));
					self.open();
					return true;
				}, 200)
			} else {
				document.querySelector(".mask").classList.add("mask-out");
				document.querySelector(".dialog").addEventListener("webkitTransitionEnd", function() {
					self.remove();
				})
				document.querySelector(".dialog").addEventListener("transitionend", function() {
					self.remove();
				})
			}
		},
		remove: function() {
			if(document.querySelector(".dialog")) document.querySelector(".dialog").parentNode.removeChild(document.querySelector(".dialog"));
			if(document.querySelector(".mask")) {
				document.querySelector(".mask").classList.remove("mask-out");
			}
			return true;
		},
		alert: function(text,callback) {
			inputText = text;
			var self = this;
			return self.create(callback);
		},
	};
	window.Dialog = Dialog;
})(window);

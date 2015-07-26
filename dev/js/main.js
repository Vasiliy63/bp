// js include exmp //= include ../components/modal/modal.js

(function () {

	function S(selector) {
		return (document.querySelectorAll(selector).length>1) ? document.querySelectorAll(selector) : document.querySelector(selector);
	}

	var a = S('.a');

})();

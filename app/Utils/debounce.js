function debounce(func, timeout)  {
	var delay;

	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(delay);
		delay = setTimeout(() => {
			func.apply(context, args);
		}, timeout);
	};
}

function debounce1(func, timeout)  {
	var delay;
	var temp;
// implement leading edge here.
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(delay);
		delay = setTimeout(() => {
			func.apply(context, args);
		}, timeout);
	};
}

function throttle(func, timeout) {
	// do it today.
	// 1. once you click, it should invoke.
	// 2. on subsequent clicks, it shouldn't.
	// 3. when it reaches delay, it should.
	// Refer: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
	let timeoutId;
	let lastRan;
	return function() {
		const context = this;
		const args = arguments;
		console.log(timeoutId, lastRan, timeout - (Date.now() - lastRan));
		if(!lastRan) {
			func.apply(context, args);
			lastRan = Date.now();
		} else {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				//making sure to run only after timeout reached.
				// Final timeout can be negative, browser keeps default 4ms, so it executes instantly.
				if (Date.now() - lastRan >= timeout ) {
					func.apply(context, args);
					lastRan = Date.now();
				}
			}, (timeout - (Date.now() - lastRan)));
		
		};
	}
}
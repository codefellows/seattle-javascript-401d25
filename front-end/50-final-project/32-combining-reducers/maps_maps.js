'use strict';

const buildMap = (inputArrayA, inputArrayB) => {
	const map = new Map();
	const intersections = [];
	for(let a of inputArrayA) {
		map.set(a,1); // Vinicio - the value doesn't matter, what matters is the key
	}

	for(let b of inputArrayB) {
		if(map.get(b)) {
			intersections.push(b);
		}
	}
	console.log(intersections);
};

buildMap([1,2,3],[1,2,5]);

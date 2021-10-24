function (context, args) { // t:#s.t1.npc
	var g = {}, r, l, ret;
	var ez = ['open', 'release', 'unlock'];
	var clrs = ['purple', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'red'];

	// Execute with args.
	function c() {
		r = args.t.call(g);
		l = r.split('\n').pop();
	}

	// Check whether last line includes str.
	function incl(str) {
		return l.includes(str)
	}

	// Check whether correct key has been entered.
	function isCorrect() {
		return incl('correct')
	}

	// Brute force strings.
	function ezs(arr, n) {
		for (var i = 0; i < arr.length; ++i) {
			g[n] = arr[i];
			c();
			if (!isCorrect()) break;
		}
	}

	// Brute force digits.
	function num(n) {
		for (var i = 0; i < 100; i++) {
			g[n] = i;
			c();
			if (!isCorrect()) break;
		}
	}

	// MAIN CODE
	// retrieve first lock.
	c();

	for (; ;) {
		if (incl('DATA_CHECK')) {
			g['DATA_CHECK'] = '';
			c();

		}
		if (incl('terminated')) return {ok: true, msg: r};
	}
}

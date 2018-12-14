function(context, args) { //tr:#s.loc.machine data:"data_check password here"
	//Developed by Ph1l4nthr0py.
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var tr = args.t, pw = ["unlock", "open", "release"], clr = ["green", "red", "blue", "purple", "lime", "yellow", "cyan", "orange"], lck = ["6hh8xw","cmppiq","sa23uw","tvfkyq","uphlaw","vc2c7q","xwz7ja","72umy0"], ca = {}
	
	
	if (!args || !args.t) {
		return { ok: false, msg: "usage: c_t1 {#s.loc}" }
	}
	function search(regex, res) { 
		let resultOfMatch = []; 
		let matches = regex.exec(res);
		while (matches) { 
			if (matches.index === regex.lastIndex) { 
				regex.lastIndex++; 
			} 
			resultOfMatch.push(matches[1] || matches[2] || matches[3]) 
			matches = regex.exec(res); 
		} 
		
		return [...new Set(resultOfMatch)]; 
	}		
	function cEz(lt) {
		//#D("Cracking `N"+lt+"` phrase...");
		for (var i = 0; i < pw.length; i++) {
			ca[lt] = pw[i];
			var res = args.t.call(ca);
			if (res.includes("`NLOCK_UNLOCKED` "+lt)||res.includes("`Ndigit` ")||res.includes("`Nez_prime` ")) {
				break;
			}
		}
	}
	function cDg(lt,ol) {
		//#D("Grabbing digit `N"+lt+"`...");
		for (var i = 0; i < 98; i++) {
			ca[lt] = i;
			var res = args.t.call(ca);
			if (res.includes("`NLOCK_UNLOCKED` "+ol)) {
				break;
			}
		}
	}
	function cC(lt) {
		//#D("Determining `N"+lt+"` color...");
		if(ca[lt] == undefined) {
			for (var i = 0; i < clr.length; i++) {
				ca[lt] = clr[i];
				var res = args.t.call(ca);
				if (res.includes("`Ncolor_digit`")||res.includes("`Nc002_complement`")||res.includes("`Nc003_triad_1`")) {
					break;
				}			
			}
		}
		switch(lt) {
			case "c001":
				//#D("Grabbing `Ncolor_digit`...");
				ca.color_digit = ca[lt].length;
				var res = args.t.call(ca);
				break;
			case "c002":
				//#D("Grabbing `Nc002_complement`...");
				for (var i = 0; i < clr.length; i++) {
					ca.c002_complement = clr[i];
					var res = args.t.call(ca);
					if (res.includes("`NLOCK_UNLOCKED` "+lt)) {
						break
					}
				}
				break;
			case "c003":
				//#D("Grabbing `Nc003` triads...");
				for (var i = 0; i < clr.length; i++) {
					ca.c003_triad_1 = clr[i];
					res = args.t.call(ca);
					if (res.includes("`Nc003_triad_2` ")) {
						break
					}
				}
				for (var i = 0; i < clr.length; i++) {
					ca.c003_triad_2 = clr[i];
					res = args.t.call(ca);
					if (res.includes("`NLOCK_UNLOCKED` "+lt)) {
						break;
					}
				}
			break;
		}
	}
	function lockSelect(l) {
		switch (String(l)) {
			case "EZ_21":
				//#D("Found `NEZ_21` lock.");
				cEz("EZ_21");
				break;
			case "EZ_35":
				//#D("Found `NEZ_35` lock.");
				cEz("EZ_35");
				cDg("digit","EZ_35");
				break;
			case "EZ_40":
				//#D("Found `NEZ_40` lock.");
				cEz("EZ_40");
				cDg("ez_prime","EZ_40");
				break;
			case "c001":
				//#D("Found `Nc001` lock.");
				cC("c001");
				break;
			case "c002":
				//#D("Found `Nc002` lock.");
				cC("c002");
				break;
			case "c003":
				//#D("Found `Nc003` lock.");
				cC("c003");
				break;
			case "DATA_CHECK":
				//#D("Found `NDATA_CHECK` lock");
				//#D("Cracking `NDATA_CHECK` lock...");
				ca.DATA_CHECK = ""
				var res = args.t.call(ca);
				var d = ""
				var dr = search(/^(.+)$/gm,res);
				for (var i = 0; i < 3; i++) {
					d += #db.f({desc:dr[i]},{key:1,_id:0}).first().key;
				}
				ca.DATA_CHECK = d
				break;
			case "l0cket":
				//#D("Found `Nl0cket` lock.");
				//#D("Cracking `Nl0cket` lock...");
				for (var i = 0; i < lck.length; i++) {
					
					ca.l0cket = lck[i];
					var res = args.t.call(ca);
					if (res.includes("`NLOCK_UNLOCKED` l0cket")) {
						break;
					}
					if (i == 7 && !res.includes("`NLOCK_UNLOCKED` l0cket")) {
						//#D("Could not open l0cket lock; password not in index.");
						throw new Error("Could not open l0cket lock.");
					}
				}	
				break;
			
			default: 
				throw new Error("No `Nlocks` found. Is `5kernel`.`2hardline` active?"); 
				break;
		}
	}
	function crack() {
		var res;
		var lock;
		
		for (var i = 0; i < 9; i++) {

			res = args.t.call(ca);
			lock = search(/\s..(\w+).\slock/g,res );
			lockSelect([lock]);		
		}
		return {ok:true, msg:"Finished cracking."};
	}
	return crack();
}

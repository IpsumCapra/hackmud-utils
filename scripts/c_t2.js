function(context, args) {
	var caller = context.caller;
	var l = #2s.scripts.lib();
	var tr = args.t, ca = {};
	
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
	
	function lockSelect(l) {
		switch (String(l)) {
			case "CON_SPEC":
				#D("Found `NCON_SPEC` lock");
				#D("Cracking `NCON_SPEC` lock...");
				ca.CON_SPEC = ""
				var res = args.t.call(ca);
				ca.CON_SPEC = search(new RegExp(search(/^(\w+)/g, res)+"(...)","g"),#db.f({desc:"con_spec"},{dictionary:1,_id:0}).first().dictionary)[0];
				break;
			case "sn_w_glock" :
				#D("Found `Nsn_w_glock` lock");
				#D("Cracking `Nsn_w_glock` lock...");
				
				break;
			case "DATA_CHECK":
				#D("Found `NDATA_CHECK` lock");
				#D("Cracking `NDATA_CHECK` lock...");
				ca.DATA_CHECK = ""
				var res = args.t.call(ca);
				var d = "";
				var dr = search(/^(.+)$/gm,res);
				for (var i = 0; i < 3; i++) {
					d += #db.f({desc:dr[i]},{key:1,_id:0}).first().key;
				}
				ca.DATA_CHECK = d;
				break;
			case "magnara":
				#D("Found `Nmagnara` lock");
				#D("Cracking `Nmagnara` lock...");
				ca.magnara = ""
				var res = args.t.call(ca);
				var dr = search(/(\w+)$/g,res)[0];
				var pR = []; // This array will hold our permutations

				for (var i=0; i<dr.length; i++) {
					var char = dr[i];
					// Cause we don't want any duplicates:
					if (dr.indexOf(char) != i) // if char was used already
						continue;           // skip it this time

					var rS = dr.slice(0,i) + dr.slice(i+1,dr.length); //Note: you can concat Strings via '+' in JS
	
					for (var sP of permut(rS))
						pR.push(char + sP)
				}
				for (var i=0; i<pR.length;i++){
					ca.magnara = pR[i];
					var res = args.t.call(ca);
					if (res.includes("`NLOCK_UNLOCKED` magnara")) {
						break;
					}
				}
				break;
			case "acct_nt":
				#D("Found `Nacct_nt` lock");
				#D("Use `Nacct` argument to specify GC.");
				ca.acct_nt = ""
				var res = args.t.call(ca);
				#D(res);
				
				
				
				
				break;
			default:
				#D(ca);
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
			#D(lock[0]);
			lockSelect([lock]);		
		}
		return {ok:true, msg:"Finished cracking."};
	}
	return crack();
}
function(context, args) {//target:#s.location
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var target = args.t, response = target.call({}), passwords = ["unlock", "open", "release"], call_args={} ;

	if (response.includes("EZ_21")) {
		for (var i = 0; i < passwords.length; i++) {
			call_args.EZ_21 = passwords[i];
			response = target.call(call_args);
			if (response.includes("`NLOCK_UNLOCKED` EZ_21")) {
				break;
			}
		}
	}
	return { ok: true };
	return response;
}

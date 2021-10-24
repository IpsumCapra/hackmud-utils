function (ct, args) { // t:#s.t1.npc
    var g = {}, r, l;
    const ez = ['open', 'release', 'unlock'];
    const clrs = ['purple', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange', 'red'];
    const lck = ["6hh8xw", "cmppiq", "sa23uw", "tvfkyq", "uphlaw", "vc2c7q", "xwz7ja", "72umy0"];
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function trs() {
        return #hs.accts.transactions({count: "all"});
    }

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
    function inc() {
        return incl('cor')
    }

    function ggd() {
        var da = /een\s(.+)\sand\s(.+)/gm.exec(l);
        //return parseInt(da[1].substr(2, 2))
        return [
            new Date(
                parseInt("20" + da[1].substr(0, 2)),
                parseInt(da[1].substr(2, 2)) - 1,
                parseInt(da[1].substr(4, 2)),
                parseInt(da[1].substr(7, 2)),
                parseInt(da[1].substr(9))
            ),
            new Date(
                parseInt("20" + da[2].substr(0, 2)),
                parseInt(da[2].substr(2, 2)) - 1,
                parseInt(da[2].substr(4, 2)),
                parseInt(da[2].substr(7, 2)),
                parseInt(da[2].substr(9))
            )
        ];
    }

    // Brute force strings.
    function bf(arr, n) {
        for (var i = 0; i < arr.length; ++i) {
            g[n] = arr[i];
            c();
            if (!inc() && !incl('larg') && !incl('betw') && !incl('orf:')) break;
        }
    }

    // Brute force digits.
    function num(n) {
        for (var i = 0; i < 100; i++) {
            g[n] = i;
            c();
            if (!inc() && !incl('abov')) break;
        }
    }

    function acct(m) {
        var trns = trs();
        var da = ggd();
        var id = 0;
        if (da[0] > da[1]) {
            id = 1;
        }

        var start = 0;

        //TODO varying the first position (recursion) also just fixing this wreck.

        for (var i = trns.length - 1; i >= 0; i--) {
            if (trns[i].time.getTime() >= da[id].getTime()) {
                start = i + 1; // eg 10 + 3 = 13
                break;
            }
        }

        var vals = [];
        var total;

        function add() {
            if (strs.sender !== "plisken") { // or ct.caller
                total += strs.amount
            } else {
                total -= strs.amount
            }

            vals.push((m !== 'both') ? Math.abs(total) : total)
        }

        for (var i = start; i >= start - 5; i--) { // i = 13
            total = 0;
            for (var j = i; j >= 0; j--) {
                var strs = trns[j];
                if (m === 'with' && strs.memo != null) {
                    add()
                } else if (m === 'out' && strs.memo == null) {
                    add()
                } else if (m === 'both') {
                    add()
                }
            }
            //vals.push("---")
        }

        bf(vals, 'acct_nt');

        //return {a:vals, b:g, c:start, d:m}
    }

    function aI(l) {
        for (var i = 0; i < abc.length; i++) {
            if (l == abc[i]) {
                return i;
            }
        }
    }

    function xA() {
        var bal = #hs.accts.balance();
        #ms.accts.xfer_gc_to({to: "otacon", amount: bal});
    }

    function fP(stt, str) {

        //base case
        if ( str.length == 1 ) {
            return [ stt + str ];
        } else {

            var returnResult = [];
            for (var i=0; i < str.length; i++) {
                var result = fP (str[i], str.substr(0, i) + str.substr(i+1));
                for (var j=0; j<result.length; j++) {
                    returnResult.push(stt + result[j]);
                }
            }

            return returnResult;
        }
    }

    // MAIN CODE
    // retrieve first lock.
    c();

    for (; ;) {
        if (incl('EZ')) {
            // EZ_21
            if (incl('2')) bf(ez, 'ez_21');
            // EZ_35
            else if (incl('5')) {
                bf(ez, 'ez_35');
                num('digit')
            }
            // EZ_40
            else {
                bf(ez, 'ez_40');
                num('ez_prime')
            }
        }
        if (incl('c0')) {
            // c001
            if (incl('1')) {
                bf(clrs, 'c001');
                num('color_digit');
            }
            // c002
            else if (incl('2')) {
                bf(clrs, 'c002');
                bf(clrs, 'c002_complement');
            }
            // c003
            else {
                bf(clrs, 'c003');
                bf(clrs, 'c003_triad_1');
                bf(clrs, 'c003_triad_2');
            }
        }
        if (incl('DAT')) {
            g['DATA_CHECK'] = '';
            c();
            r = r.split('\n');
            var ans = ""
            for (var i = 0; i < r.length; i++) {
                ans += #fs.lore.data_check({lookup: r[i]}).answer;
            }
            g['DATA_CHECK'] = ans;
            c();
        }
        if (incl('l0c')) {
            bf(lck, 'l0cket');
        }
        if (incl('acct')) {
            g['acct_nt'] = '';
            c();
            if (incl('larg')) {
                var trs = trs().map(a => a.amount);
                bf(trs, 'acct_nt');
            } else if (incl('net')) {
                acct('both');
            } else {
                if (incl("out")) {
                    acct('out');
                } else {
                    acct('with');
                }
            }
        }
        if (incl('glock')) {
            xA();
            g['sn_w_glock'] = '';
            c();
            #ms.otacon.glock_xfer({g: l});
            c();
        }
        if (incl('SPEC')) {
            g['CON_SPEC'] = '';
            c();

            var spec = r.split('\n')[0];
            var st = aI(spec[0]);
            var res = 0;

            for (var i = 1; i < 3; i++) {
                var lval = aI(spec[i]);
                if (st - lval < 10) {
                    lval -= 26
                }
                if (st - lval > 10) {
                    lval += 26
                }
                res += lval - st
            }

            var ans = "";
            var ind;

            for (var i = 1; i <= 3; i++) {
                switch (res) {
                    case 3:
                        ans += abc[(st + 6 + i) % 26];
                        break;
                    case -3:
                        ind = st - 6 - i;
                        ans += abc[(ind < 0) ? ind + 26 : ind];
                        break;
                    case 5:
                        ans += abc[(st + 12 + (i > 1 ? i + 2 : i)) % 26];
                        break;
                    case -5:
                        ind = st - 12 - (i > 1 ? i + 2 : i);
                        ans += abc[(ind < 0) ? ind + 26 : ind];
                        break;
                    case 6:
                        ans += abc[(st + 12 + i * 2) % 26];
                        break;
                    case -6:
                        ind = st - 12 - i * 2;
                        ans += abc[(ind < 0) ? ind + 26 : ind];
                        break;
                    case 7:
                        ans += abc[(st + 14 + (i > 2 ? i + 2 : i)) % 26];
                        break;
                    case -7:
                        ind = st - 14 - (i > 2 ? i + 2 : i);
                        ans += abc[(ind < 0) ? ind + 26 : ind];
                        break;
                }
            }

            g['CON_SPEC'] = ans;
            c();
        }
        if (incl('k3y')) {
            return {a: g, b: r};
        }
        if (incl('magnara')) {
            g['magnara'] = '';
            c();
            var st = /\:\s(\w+)/g.exec(l)[1];
            var arr = fP('', st);
            //return "\'" + arr[0] + "\'";
            bf(arr, 'magnara');
        }
        if (incl('terminated')) {
            xA();
            return {ok: true, msg: g};
        }
    }
}

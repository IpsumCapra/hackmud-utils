function(context, args){ // t:#s.t1npc.corp
    // searches a page (response) looking for regex matches, and storing them in an array
    function search(regex, response) {
        let resultOfMatch = [];
        let matches = regex.exec(response);
        while (matches) {
            if (matches.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            resultOfMatch.push(matches[1] || matches[2] || matches[3])
            matches = regex.exec(response);
        }
        return [...new Set(resultOfMatch)];
    }
    // main source of output, also used for development purposes
    function logicController(){
        var page = {};
        var res = args.t.call();
        // regex for pub pages
        var pP = search(/\s(\w+)\s\|/g, res);
        // get the navigation arg
        res = args.t.call({});
        var navArg = search(/\s(\w+):/g, res);
        var dirArg = search(/:"(\w+)"/g, res);
        // add the nav arg to the public pages to get the full arg:value string
        page[navArg] = pP[0];
        // gets the wall of text on the news page
        res = args.t.call(page);
        // search the page for relevant info
        var usernames = search(/([A-Za-z0-9_-]+)\sof\sproject|-{2}\s(\w+)\s/g, res);
        var projects = search(/continues\son\s([A-Za-z0-9_()]+)|on\s([A-Za-z0-9_()]+)\sprogress/g, res);
        // searches for the password
        page[navArg] = pP[1];
        res = args.t.call(page);
        let password = search(/\sstrategy\s(\w+)\s/g, res);
        // displays all of the info
        // for (var i = 0; i < projects.length; i++) {
        //     page[navArg]=[password];
        //     #D(args.t.call(page));
        // }


        return [["`5unames:`", usernames], ["`5projs:`", projects], ["`5pws:`", password],["`5nav arg:`","`N"+navArg+"`:`V\""+dirArg+"\"`"]];

    }
    return logicController();
}
// create table view data object
Titanium.UI.setBackgroundColor('black');

function getTeams()
{
// yql rocks!
//xhr.open("GET","http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http://loco.ubuntu.com/teams/%22%20and%20xpath%3D'//ul/li/a'&format=json");
xhr.open ("GET", "http://loco.ubuntu.com/services/teams/");
xhr.onload = function()
{
	try
	{
		var data = JSON.parse(this.responseText);

		// ignore the first 5 li items on the page since we dont have real
		// programmatic access to the data yet - warning fragile
//		for (var c=5;c<data.query.results.a.length;c++)

		{
			var teamname = data.query.results.a[c].content;
			
			teamname = cleanupTeamName(teamname);

			var teamlink = data.query.results.a[c].href;
			Ti.API.info(teamname + ": " + teamlink);
//			mugshotURL = 'http://edge.launchpad.net/api/beta' + teamlink + '/mugshot'
			mugshotURL = 'imgs/approved.png';
			teams.push({title:teamname,leftImage: mugshotURL,hasChild:true,link:teamlink});
		}
		teams.sort(teamsort);
		tableview.setData(teams);
//		masterWindow.remove(masterLabel);
	}
	catch(E)
	{
		alert(E);
	}
};
xhr.send();
win2.add(tableview);
}

function teamsort(a, b) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

// detailWindow.add(eventview);

// Handle team selection, load events list
tableview.addEventListener('click', function(e)
{  
    // event data 
    var index = e.index; 
    var section = e.section; 
    var row = e.row; 
    var rowdata = e.rowData;
	var xhre = Ti.Network.createHTTPClient();

	xhre.open("GET","http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http://loco.ubuntu.com" + rowdata.link + "/events%22%20and%20xpath%3D'//ul/li/a'&format=json");

	xhre.onload = function()
	{
		try
		{
			var data = JSON.parse(this.responseText);
			var events = [];
			Ti.API.info(this.responseText);
		
			// ignore the first 5 li items on the page - warning fragile
			for (var c=5;c<data.query.results.a.length;c++)
			{
				var eventname = data.query.results.a[c].content;
				var eventlink = data.query.results.a[c].href;
				events.push({title:eventname,hasChild:true,link:eventlink});
			}
			eventview.setData(events);
		}
		catch(E)
		{
			alert(E);
		}
	};
	xhre.send();
});


// Handle event selection, currently load webview of the event page
// TODO: fix event webview hack to display a real android window
eventview.addEventListener('click', function(e)
{  
    // event data 
    var index = e.index;
    var rowdata = e.rowData;
    Ti.API.info("event selected: " + rowdata.link);
	masterWindow.add(mapview);
});

// menu items
var sync = Ti.UI.Android.OptionMenu.createMenuItem( {
	title: 'Sync'
});
sync.addEventListener('click',function()
{
	// TODO: add sync process
});
menu.add(sync);
Ti.UI.Android.OptionMenu.setMenu(menu);


function cleanupTeamName(team) {
	// isnt 'Ubuntu' redundant in the team name? remove it
	team = team.replace(/^Ubuntu/gi,'');
	// maybe replace this with US-,but for now remove it
	// team = team.replace(/United\ States,\ /gi,'');
	// team = team.replace(/United\ States\ -\ /gi,'');
	// clean up the mess made by the above
	team = team.replace(/-/g,' ');
	// get rid of tabs, newlines, carriage return
	team = team.replace(/[\t\r\n]/g,' ')
	team = team.replace(/^\ /g,'');
	// TODO: uppercase first letter						
	capname = team[0].toUpperCase();
	team = team.replace(/\b[a-z]/,capname);
	return team;
}



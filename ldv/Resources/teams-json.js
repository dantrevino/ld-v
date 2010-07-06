// create table view data object
Titanium.UI.setBackgroundColor('black');
// TODO: list all teams
teamButton.addEventListener('click', function (e) 
{
    Ti.API.info('you pressed the team button');
    xhr.open ("GET", "http://loco.ubuntu.com/services/teams/");
    xhr.onload = function()
    {
        if (xhr.status == 200)
        {
            Ti.API.info('>>> got the team json! ... ');
		    var data = JSON.parse(this.responseText);
            try
	        {

                for (var c=0; c < data.length; c++)
        		{
        			var teamname = data[c].name;
        			var teammugshot = data[c].mugshot_url;
        			var teamurl = data[c].web_url;
                    
                    if (teamname != null) {
    //                    teamname = cleanupTeamName(teamname);
            			teams.push({title:teamname,leftImage: teammugshot,hasChild:true,link:teamurl,color:'white'});
            			Ti.API.info("name: " + teamname + ", url: " + teamurl + ", mugshot: " + teammugshot);
                    }
        		}
    //    		teams.sort(teamsort);
        		tableview.setData(teams);
    //    		tableview.show();
	        }
	        catch(E)
	        {
		        Ti.API.alert(E);
	        }

        } 
        else
        {
            Ti.API.alert(E)
        }
        // TODO: pre-emptive network availability checking
        // TODO: error gracefully for non-200 HTTP status

    }
    xhr.send();
    win2.add(tableview);
    win2.open();
});

function teamsort(a, b) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

// Handle team selection, load events list
//tableview.addEventListener('click', function(e)
//{  
//    // event data 
//    var index = e.index; 
//    var section = e.section; 
//    var row = e.row; 
//    var rowdata = e.rowData;
//	var xhre = Ti.Network.createHTTPClient();

//	xhre.open("GET","http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http://loco.ubuntu.com" + rowdata.link + "/events%22%20and%20xpath%3D'//ul/li/a'&format=json");

//	xhre.onload = function()
//	{
//		try
//		{
//			var data = JSON.parse(this.responseText);
//			var events = [];
//			Ti.API.info(this.responseText);
//		
//			// ignore the first 5 li items on the page - warning fragile
//			for (var c=5;c<data.query.results.a.length;c++)
//			{
//				var eventname = data.query.results.a[c].content;
//				var eventlink = data.query.results.a[c].href;
//				events.push({title:eventname,hasChild:true,link:eventlink});
//			}
//			eventview.setData(events);
//		}
//		catch(E)
//		{
//			alert(E);
//		}
//	};
//	xhre.send();
//});


// Handle event selection, currently load webview of the event page
// TODO: fix event webview hack to display a real android window
//eventview.addEventListener('click', function(e)
//{  
//    // event data 
//    var index = e.index;
//    var rowdata = e.rowData;
//    Ti.API.info("event selected: " + rowdata.link);
//	masterWindow.add(mapview);
//});

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

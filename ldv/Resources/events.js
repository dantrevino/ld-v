// create table view data object
Titanium.UI.setBackgroundColor('black');
function loadEvents(event e)
{
    eventview = Ti.UI.createTableView();

    eventview.addEventListener('loadevents', function(e) {
        Ti.API.alert("loading event info...");
    });

    var xhre = Ti.Network.createHTTPClient();
    xhre.open("GET","http://loco.ubuntu.com/services/events/");

    xhre.onload = function()
    {
	    try
	    {
		    var data = JSON.parse(this.responseText);
		    var events = [];
		
		    for (var c=0;c<data.length;c++)
		    {
			    var eventname = data[c].name;
			    var eventlink = data[c].event_url;

			    var row = Ti.UI.createTableViewRow({height:45});
			    var title = Ti.UI.createLabel({
				    left:50,
				    right:10,
				    textAlign:'left',
				    height:40,
				    text:eventname,
				    font:{fontWeight:'normal',fontSize:14}
			    });
			    row.add(title);
			    events[c] = row;
		    }
		    eventview.setData(events);
	    }
	    catch(E)
	    {
		    alert(E);
	    }
    };
    xhre.send();
    win2.add(eventview);
};


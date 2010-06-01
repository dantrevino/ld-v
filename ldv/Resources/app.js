// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('white');

var tableview = Ti.UI.createTableView();
var eventview = Ti.UI.createTableView();
var menu = Ti.UI.Android.OptionMenu.createMenu();
var mapWindow = Ti.UI.createWindow({
  background: 'white',
  title: 'map',
  fullscreen: false   
});
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	animate:true,
	regionFit:true,
	userLocation:true
});
mapWindow.add(mapview);


var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'white',
    fullscreen: false
});


var teams = [];
var events = [];

// scrape the loco teams page for a list of teams
var xhr = Ti.Network.createHTTPClient();

Ti.include('teams.js');



//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
    title:'Tab 1',
    backgroundColor:'white',
    fullscreen: false
});

win1.layout = 'vertical';

var view1 = Ti.UI.createView({
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto'
});

var eventButton = Titanium.UI.createButton({
	color:'#000',
	backgroundImage: 'button_64x64.png',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	height: '96px',
	top: 1,
	left: ((Titanium.Platform.displayCaps.platformWidth/2)/2)-48,
	title: 'Events'
});

view1.add(eventButton);

var teamButton = Titanium.UI.createButton({
	color:'#000',
	backgroundImage: 'button_64x64.png',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	height: '96px',
	top: 1,
	left:  ((Titanium.Platform.displayCaps.platformWidth/2)+(Ti.Platform.displayCaps.platformWidth/4)-48),
	title: 'Teams'
});

view1.add(teamButton);
win1.add(view1);
win1.open();


// TODO: list nearby events
eventButton.addEventListener('click', function (e) 
{
   Ti.API.info('you pressed the event button'); 
});

// TODO: list all teams
teamButton.addEventListener('click', function (e) 
{
   Ti.API.info('you pressed the team button');
   getTeams();
   win2.open();
});



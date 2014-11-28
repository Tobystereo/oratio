Template.layout.logged_in = function(){
    return Meteor.user();
};

Template.nav.logged_in = function() {
	return Meteor.user();
};

// Expand the login drop-down
Template.nav_loggedout.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Template.requests.events({
	'keyup #new_request' : function (e,t) {
		if(event.keyCode == 13) {
			var the_text = document.getElementById('new_request').value;
			console.log(the_text);
			var the_user = Meteor.userId();
			console.log(the_user);
			Oratio.PrayerRequests.addRequest(the_user, the_text);
			document.getElementById('new_request').value = "";
		}
	},

	'click #add_new_request' : function (e,t) {
		var the_text = document.getElementById('new_request').value;
		console.log(the_text);
		var the_user = Meteor.userId();
		console.log(the_user);
		Oratio.PrayerRequests.addRequest(the_user, the_text);
		document.getElementById('new_request').value = "";
	},

	'click .deleteRequest' : function (e,t) {
		var the_id = e.currentTarget.getAttribute('data-id');
		console.log('the_id: ' + the_id);
		var the_author = this.user;
		console.log('the_author: ' + the_author);
		Oratio.PrayerRequests.deleteRequest(the_author, the_id);
	},

	'click .markRequestAnswered' : function (e,t) {
		var the_id = e.currentTarget.getAttribute('data-id');
		console.log('the_id: ' + the_id);
		var the_author = this.user;
		console.log('the_author: ' + the_author);
		Oratio.PrayerRequests.markAnswered(the_author, the_id);
	},

	'click .markRequestUnanswered' : function (e,t) {
		var the_id = e.currentTarget.getAttribute('data-id');
		console.log('the_id: ' + the_id);
		var the_author = this.user;
		console.log('the_author: ' + the_author);
		Oratio.PrayerRequests.markUnanswered(the_author, the_id);
	}
});

Template.requests.numberofrequests = function() {
	var the_user = Session.get('currentUserId');
	return PrayerRequestsModel.find({user: the_user}).count();
};

Template.requests.userId = function() {
	return Session.get('currentUserId');
};

Template.requests.unanswered = function() {
	var status = this.status;
	if(status == "unanswered") {
		return true;
	} else {
		return false;
	}
};

Template.requests.request = function() {
	var the_user = Session.get('currentUserId');
	return PrayerRequestsModel.find({user: the_user}, {sort: {date: -1}});
};

Template.requests.creationDate = function() {
	var the_date = this.date;
	console.log(the_date);
	var the_humanreadable_date = the_date.toDateString();
	console.log(the_humanreadable_date);
	return the_humanreadable_date;
};

function getUserId() {
	return this.params.userid;
};
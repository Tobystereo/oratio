// Router.configure({layoutTemplate: 'layout'});

Router.map(function() {
  this.route('homepage', {path: '/'});
  this.route('requests'), {path: '/requests'};
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
  	Session.set('currentUserId', '');
    Router.go('homepage');
    pause();
  } else {
  	Session.set('currentUserId', Meteor.userId());
  }
  this.next();
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('requests');
    pause();
  }
  this.next();
};

Router.onBeforeAction(mustBeSignedIn, {except: ['homepage']});
Router.onBeforeAction(goToDashboard, {only: ['homepage']});
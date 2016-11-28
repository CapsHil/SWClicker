Game = new Mongo.Collection("games");


//Meteor.onStartup(function() {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  Meteor.call('getBackup', Meteor.userId());
//});


if(Meteor.loggingIn()) {
  console.log("Logging in");
  Meteor.call('initBackup', Meteor.userId());
  console.log("Game loaded");
  Meteor.setInterval(function() {
    if(Meteor.user() != null) {
      saveGame();
    }
  }, 10000);
}

Session.setDefault('credit', 0);
Session.setDefault('stNb', 0);
Session.setDefault('tieNb', 0);
Session.setDefault('stPrice', 10);
Session.setDefault('tiePrice', 50);
Session.setDefault('autoClicker', 0);




Template.body.helpers({
  users: function() {
    return Users.find({});
  }
});

Template.hello.helpers({
credit: function () {
  return Math.round(Session.get('credit'));
},
tieNb: function() {
  return Session.get('tieNb');
},
stNb: function() {
  return Session.get('stNb');
},
stPrice: function() {
  return Session.get('stPrice');
},
tiePrice: function() {
  return Session.get('tiePrice');
},
autoClick: function() {
  return Session.get('autoClicker');
}
});

/*
Meteor.setInterval(function() {
  Session.set('credit', Session.get('credit') + Session.get('autoClicker'));
  if(Session.get('credit') >= Session.get('tiePrice')) {
    document.getElementById('tie').className = "btn-ok";
  }else{
    document.getElementById('tie').className = "btn";
  }
  if(Session.get('credit') >= Session.get('stPrice')) {
    document.getElementById('st').className = "btn-ok";
  }else{
    document.getElementById('st').className = "btn";
  }
}, 1000);
*/

Template.hello.events({
  'click .credit': function () {
    Session.set('credit', Session.get('credit') + 1);
    if(Session.get('credit') >= Session.get('tiePrice')) {
      document.getElementById('tie').className = "btn-ok";
    }else{
      document.getElementById('tie').className = "btn";
    }
    if(Session.get('credit') >= Session.get('stPrice')) {
      document.getElementById('st').className = "btn-ok";
    }else{
      document.getElementById('st').className = "btn";
    }
  },
  'click #tie': function() {
    if(Session.get('credit') >= Session.get('tiePrice')) {
      Session.set('credit', Session.get('credit') - Session.get('tiePrice')) ;
      Session.set('tieNb', Session.get('tieNb')+1);
      Session.set('tiePrice', Session.get('tiePrice')+2);
      Session.set('autoClicker', Session.get('autoClicker') + 0.5);
    }
    if(Session.get('credit') >= Session.get('tiePrice')) {
      document.getElementById('tie').className = "btn-ok";
    }else{
      document.getElementById('tie').className = "btn";
    }
  },
  'click #st': function() {
    if(Session.get('credit') >= Session.get('stPrice')) {
      Session.set('credit', Session.get('credit') - Session.get('stPrice')) ;
      Session.set('stNb', Session.get('stNb')+1);
      Session.set('stPrice', Session.get('stPrice')+2);
      Session.set('autoClicker', Session.get('autoClicker') + 0.2);
    }
    if(Session.get('credit') >= Session.get('stPrice')) {
      document.getElementById('st').className = "btn-ok";
    }else{
      document.getElementById('st').className = "btn";
    }
  }
});

function saveGame() {
  console.log("Game saved!");
//  Meteor.call('updateBackup', Meteor.userId(), Session.get('credit'), Session.get('stNb'), Session.get('tieNb'), Session.get('autoClicker'));
}

Meteor.methods({
  loadGame: function(credit, st, tie, clicker) {
    Session.set('credit', credit);
    Session.set('stNb', st);
    Session.set('tieNb', tie);
    Session.set('autoClicker', clicker);
  }
});

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
Session.setDefault('tie', '???');
Session.setDefault('st', '???');

Template.body.helpers({
  users: function() {
    return Users.find({});
  }
});

Template.main.helpers({
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
  },
  st: function() {
    return Session.get('st');
  },
  tie: function() {
    return Session.get('tie');
  }
});


Meteor.setInterval(function() {
  Session.set('credit', Session.get('credit') + Session.get('autoClicker'));
  checkButtonAvailiability();
}, 1000);

function checkButtonAvailiability() {
  if(Session.get('credit') >= Session.get('tiePrice')) {
      document.getElementById('tie').className = "btn-ok";
    Session.set('tie', "TIE Fighter");
  }else{
      document.getElementById('tie').className = "btn";
  }
  if(Session.get('credit') >= Session.get('stPrice')) {
      document.getElementById('st').className = "btn-ok";
    Session.set('st', "Stromtrooper");
  }else{
      document.getElementById('st').className = "btn";
  }
}

function setSessionValueAfterClick(item, itemPrice, itemNb, price, autoclick) {
  if(Session.get('credit') >= Session.get(itemPrice)) {
    Session.set('credit', Session.get('credit') - Session.get(itemPrice)) ;
    Session.set(itemNb, Session.get(itemNb)+1);
    Session.set(itemPrice, Session.get(itemPrice)+price);
    Session.set('autoClicker', Session.get('autoClicker') + autoclick);
  }
  if(Session.get('credit') >= Session.get(itemPrice)) {
    document.getElementById(item).className = "btn-ok";
  }else{
    document.getElementById(item).className = "btn";
  }
}


Template.main.events({
  'click .credit': function () {
    Session.set('credit', Session.get('credit') + 1);
    checkButtonAvailiability();
  },
  'click #tie': function() {
    setSessionValueAfterClick('tie', 'tiePrice', 'tieNb', 5, 0.5);
  },
  'click #st': function() {
    setSessionValueAfterClick('st', 'stPrice', 'stNb', 2, 0.2);
    
  }
});

function saveGame() {
  console.log("Game saved!");
  //Meteor.call('updateBackup', Meteor.userId(), Session.get('credit'), Session.get('stNb'), Session.get('tieNb'), Session.get('autoClicker'));
}

Meteor.methods({
  loadGame: function(credit, st, tie, clicker) {
    Session.set('credit', credit);
    Session.set('stNb', st);
    Session.set('tieNb', tie);
    Session.set('autoClicker', clicker);
  }
});

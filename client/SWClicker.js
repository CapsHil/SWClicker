import Bonus from '/collections/bonus.js'
import Games from '/collections/games.js'

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
Meteor.call('getBackup', Meteor.userId());

Session.setDefault('isDarkSide', true);
Session.setDefault('credit', 0);
Session.setDefault('creditClick', 1);
Session.setDefault('stNb', 0);
Session.setDefault('tieNb', 0);
Session.setDefault('sdNb', 0);
Session.setDefault('stPrice', 10);
Session.setDefault('tiePrice', 50);
Session.setDefault('sdPrice', 1000);
Session.setDefault('autoClicker', 0);
Session.setDefault('tie', '???');
Session.setDefault('st', '???');
Session.setDefault('sd', '???');
Session.setDefault('bonusLvl', 1);

if(Meteor.loggingIn()) {
  console.log("Logging in");
  Meteor.call('initBackup', Meteor.userId());
  console.log("Game loaded");
  Meteor.setInterval(function() {
    if(Meteor.user() != null) {
      saveGame();
    }
  }, 10000);
  Meteor.call('getBackup', Meteor.userId(), function(error, result) {
    if (error) {
      // handle error
    }
    else {
      var game=result;
      Session.set('credit', game.credit);
      Session.set('clicker', game.clicker);
      Session.set('sdNb', game.sd);
      Session.set('stNb', game.st);
      Session.set('tieNb', game.tie);
      Session.set('bonusLvl', game.bonusLvl);
      Session.set('isDarkSide', game.isDarkSide);
      Session.set('creditClick', game.creditClick);
      changeForceSide(Session.get('isDarkSide'));
      checkOnLogIn();
    }
  });
}

Template.body.helpers({
  users: function() {
    return Users.find({id: 1});
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
  sdNb: function() {
    return Session.get('sdNb');
  },
  sdPrice: function() {
    return Session.get('sdPrice');
  },
  autoClick: function() {
    return Math.round(Session.get('autoClicker'));
  },
  st: function() {
    return Session.get('st');
  },
  tie: function() {
    return Session.get('tie');
  },
  sd: function() {
    return Session.get('sd');
  },
  bonus: function() {
    return Bonus.find({});
  }
});


Meteor.setInterval(function() {
  Session.set('credit', Session.get('credit') + Session.get('autoClicker'));
  checkButtonAvailiability();
  document.title = Math.round(Session.get('credit')) + " GC";
  checkBonusAvailiability();
  //changeForceSide(Session.get('isDarkSide'));
}, 1000);

// Meteor.setInterval(function() {
//   saveGame();
// }, 10000);

function checkBonusAvailiability() {
  var bonus = Bonus.find({id: Session.get('bonusLvl')}).fetch();
  if(Session.get('bonusLvl') == 1) {
    document.getElementById('1').className = "row thumbnail";
    if(Session.get('credit') >= bonus[0].cost) {
      document.getElementById('1').innerHTML = "<button class=\"btn-ok bonus\">"+bonus[0].name+"<span class=\"badge badge-0\"></span><br />"+bonus[0].cost+" GC</button>";
    }
  }
  if(Session.get('bonusLvl') == 2) {
    document.getElementById('2').className = "row thumbnail";
    if(Session.get('credit') >= bonus[0].cost) {
      document.getElementById('2').innerHTML = "<button class=\"btn-ok bonus\">"+bonus[0].name+"<span class=\"badge badge-0\"></span><br />"+bonus[0].cost+" GC</button>";
    }
  }
  if(Session.get('bonusLvl') == 3) {
    document.getElementById('3').className = "row thumbnail";
    if(Session.get('credit') >= bonus[0].cost) {
      document.getElementById('3').innerHTML = "<button class=\"btn-ok bonus\">"+bonus[0].name+"<span class=\"badge badge-0\"></span><br />"+bonus[0].cost+" GC</button>";
    }
  }
  if(Session.get('bonusLvl') == 4) {
    document.getElementById('4').className = "row thumbnail";
    if(Session.get('credit') >= bonus[0].cost) {
      document.getElementById('4').innerHTML = "<button class=\"btn-ok bonus\">"+bonus[0].name+"<span class=\"badge badge-0\"></span><br />"+bonus[0].cost+" GC</button>";
    }
  }
  if(Session.get('bonusLvl') == 5) {
    document.getElementById('5').className = "row thumbnail";
    if(Session.get('credit') >= bonus[0].cost) {
      document.getElementById('5').innerHTML = "<button class=\"btn-ok bonus\">"+bonus[0].name+"<span class=\"badge badge-0\"></span><br />"+bonus[0].cost+" GC</button>";
    }
  }
}

function checkOnLogIn() {
  if(Session.get('tie') > 0) {
    if(Session.get('isDarkSide')) {
      Session.set('tie', "TIE Fighter");
    } else {
      Session.set('tie', "X-Wing Fighter");
    }
  }
  if(Session.get('st') > 0) {
    if(Session.get('isDarkSide')) {
      Session.set('st', "Stromtrooper");
    } else {
      Session.set('st', "Rebel Soldier");
    }
  }
  if(Session.get('sd') > 0) {
    if(Session.get('isDarkSide')) {
      Session.set('sd', "Star Destroyer");
    } else {
      Session.set('sd', "Millenium Falcon");
    }
  }
  for(i = 1; i < Session.get('bonusLvl'); i++) {
    var bonus = Bonus.find({id: i}).fetch();
    document.getElementById(String(i)).className = "row thumbnail";
    document.getElementById(String(i)).innerHTML = "<button class=\"btn-ok bonus done\">"+bonus[0].name+"</button>"
  }
}

function checkButtonAvailiability() {
  if(Session.get('credit') >= Session.get('tiePrice')) {
    document.getElementById('tie').className = "btn-ok";
    if(Session.get('isDarkSide')) {
      Session.set('tie', "TIE Fighter");
    } else {
      Session.set('tie', "X-Wing Fighter");
    }
  }else{
      document.getElementById('tie').className = "btn";
  }
  if(Session.get('credit') >= Session.get('stPrice')) {
    document.getElementById('st').className = "btn-ok";
    if(Session.get('isDarkSide')) {
      Session.set('st', "Stromtrooper");
    } else {
      Session.set('st', "Rebel Soldier");
    }
  }else{
      document.getElementById('st').className = "btn";
  }
  if(Session.get('credit') >= Session.get('sdPrice')) {
    document.getElementById('sd').className = "btn-ok";
    if(Session.get('isDarkSide')) {
      Session.set('sd', "Star Destroyer");
    } else {
      Session.set('sd', "Millenium Falcon");
    }
  }else{
      document.getElementById('sd').className = "btn";
  }
}

function setSessionValueAfterClick(item, itemPrice, itemNb, autoclick) {
  if(Session.get('credit') >= Session.get(itemPrice)) {
    Session.set('credit', Session.get('credit') - Session.get(itemPrice)) ;
    Session.set(itemNb, Session.get(itemNb)+1);
    Session.set(itemPrice, Session.get(itemPrice)+Math.round((Session.get(itemPrice)*0.1)));
    Session.set('autoClicker', Session.get('autoClicker') + autoclick);
  }
  if(Session.get('credit') >= Session.get(itemPrice)) {
    document.getElementById(item).className = "btn-ok";
  }else{
    document.getElementById(item).className = "btn";
  }
}

function changeForceSide(isDarkSide) {
  if(!isDarkSide) {
    document.getElementById('lightsaber1').className = "lightSaber luke";
    document.getElementById('lightsaber2').className = "lightSaber luke";
    document.getElementById('lightSide').innerHTML = "Got to the Dark Side";
    document.getElementById('lightSide').id = "darkSide";
    document.getElementById('logo').src = "img/logo_alliance.png";
    document.body.style.backgroundImage = "url('img/wallpaper4.jpg')";
  } else {
    document.getElementById('lightsaber1').className = "lightSaber vader";
    document.getElementById('lightsaber2').className = "lightSaber vader";
    document.getElementById('darkSide').innerHTML = "Got to the Light Side";
    document.getElementById('darkSide').id = "lightSide";
    document.getElementById('logo').src = "img/logo_empire.png";
    document.body.style.backgroundImage = "url('img/wallpaper1.jpg')";
  }
}

Template.head.events({
  'click #lightSide': function() {
    Session.set('isDarkSide', false);
    changeForceSide(Session.get('isDarkSide'));
  },
  'click #darkSide': function() {
    Session.set('isDarkSide', true);
    changeForceSide(Session.get('isDarkSide'));
  }

});

Template.main.events({
  'click .credit': function () {
    Session.set('credit', Session.get('credit') + Session.get('creditClick'));
    checkButtonAvailiability();
  },
  'click #tie': function() {
    setSessionValueAfterClick('tie', 'tiePrice', 'tieNb', 2);
  },
  'click #st': function() {
    setSessionValueAfterClick('st', 'stPrice', 'stNb', 1);
  },
  'click #sd': function() {
    setSessionValueAfterClick('sd', 'sdPrice', 'sdNb', 10);
  },
  'click .bonus': function() {
    clickOnBonusNumber(this.id);
  }
});

function clickOnBonusNumber(id) {
  var bonus = Bonus.find({id: id}).fetch();
  switch(id) {
      case 1:
        if(Session.get('bonusLvl') == 1 && Session.get('credit') >= bonus[0].cost) {
          Session.set('creditClick', Session.get('creditClick')+1);
          Session.set('bonusLvl', Session.get('bonusLvl')+1);
          document.getElementById('1').innerHTML = "<button class=\"btn-ok bonus done\">"+bonus[0].name+"</button>"
          Session.set('credit', Session.get('credit') - 200) ;
        }
        break;
      case 2:
        if(Session.get('bonusLvl') == 2 && Session.get('credit') >= bonus[0].cost) {
          Session.set('creditClick', Session.get('creditClick')+3);
          Session.set('bonusLvl', Session.get('bonusLvl')+1);
          document.getElementById('2').innerHTML = "<button class=\"btn-ok bonus done\">"+bonus[0].name+"</button>"
          Session.set('credit', Session.get('credit') - 500) ;
        }
        break;
      case 3:
        if(Session.get('bonusLvl') == 3 && Session.get('credit') >= bonus[0].cost) {
          Session.set('creditClick', Session.get('creditClick')+5);
          Session.set('bonusLvl', Session.get('bonusLvl')+1);
          document.getElementById('3').innerHTML = "<button class=\"btn-ok bonus done\">"+bonus[0].name+"</button>"
          Session.set('credit', Session.get('credit') - 1000) ;
        }
        break;
      case 4:
        if(Session.get('bonusLvl') == 4 && Session.get('credit') >= bonus[0].cost) {
          Session.set('creditClick', Session.get('creditClick')+10);
          Session.set('bonusLvl', Session.get('bonusLvl')+1);
          document.getElementById('4').innerHTML = "<button class=\"btn-ok bonus done\">"+bonus[0].name+"</button>"
          Session.set('credit', Session.get('credit') - 2000) ;
        }
        break;
      case 5:
        if(Session.get('bonusLvl') == 5 && Session.get('credit') >= bonus[0].cost) {
          Session.set('creditClick', Session.get('creditClick')+30);
          Session.set('bonusLvl', Session.get('bonusLvl')+1);
          document.getElementById('5').innerHTML = "<button class=\"btn-ok bonus done\">"+bonus[0].name+"</button>"
          Session.set('credit', Session.get('credit') - 5000) ;
        }
        break;
    }
}

function saveGame() {
  var popup = document.getElementById('popup');
  popup.classList.toggle('show');
  Meteor.call('updateBackup', Meteor.userId(), Math.round(Session.get('credit')), Session.get('stNb'), Session.get('tieNb'), Session.get('sdNb'), Session.get('autoClicker'), Session.get('bonusLvl'), Session.get('isDarkSide'), Session.get('creditClick'));
}

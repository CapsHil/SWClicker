import Bonus from '/collections/bonus.js'
import Games from '/collections/games.js'

Meteor.methods({
	initBackup: function(id) {
		console.log('User is logging in')
		if(Games.findOne({player: id}) == null) {
			console.log('First back up on server');
			Games.insert({player: id, credit: 0, st: 0, tie: 0, clicker: 0});
		}
	},

	updateBackup: function(id, newCredit, newSt, newTie, newSd, newClicker) {
		Games.update({player: id}, { $set: {credit: newCredit, st: newSt, tie: newTie, sd: newSd, cliker: newClicker}});
	},

	getBackup: function(id) {
		if(Games.findOne({player: id}) != null) {
			var game = Games.findOne({player: id});
			console.log('Loading game ' + game + ' ' + game.credit);
			Meteor.call('loadGame', game.credit, game.st, game.tie, game.clicker);
		}
	}
});


Meteor.startup(function () {

});
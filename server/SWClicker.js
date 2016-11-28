Meteor.methods({
	initBackup: function(id) {
		console.log('User is logging in')
		if(Game.findOne({player: id}) == null) {
			console.log('First back up on server');
			Game.insert({player: id, credit: 0, st: 0, tie: 0, clicker: 0});
		}
	},

	updateBackup: function(id, newCredit, newSt, newTie, newClicker) {
		Game.update({player: id}, { $set: {credit: newCredit, st: newSt, tie: newTie, cliker: newClicker}});
	},

	getBackup: function(id) {
		if(Game.findOne({player: id}) != null) {
			var game = Game.findOne({player: id});
			console.log('Loading game ' + game + ' ' + game.credit);
			Meteor.call('loadGame', game.credit, game.st, game.tie, game.clicker);
		}
	}
});


Meteor.startup(function () {
		
    });
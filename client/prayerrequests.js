Oratio.PrayerRequests = {
	addRequest : function(user, text) {
		PrayerRequestsModel.insert({
			'user'		: user,
			'text'		: text,
			'status'	: 'unanswered',
			'date'		: new Date(),
			// 'watchers'	: watchers,
			'privacy'	: 'private'
			// 'comments'	: comments
		});
	},

	deleteRequest : function(user, requestId) {
		var currentUser = Session.get('currentUserId');
		if(currentUser == user) {
			PrayerRequestsModel.remove({
				'_id': requestId
			});
		} else {
			alert('You can only delete Prayer requests you have created.');
		}
	},

	markAnswered : function(user, requestId) {
		var currentUser = Session.get('currentUserId');
		if(currentUser == user) {
			PrayerRequestsModel.update({
				'_id': requestId},
				{$set: {status: 'answered'}}
			);
		} else {
			alert('You can only mark Prayer requests you have created.');
		}
	},

	markUnanswered : function(user, requestId) {
		var currentUser = Session.get('currentUserId');
		if(currentUser == user) {
			PrayerRequestsModel.update({
				'_id': requestId},
				{$set: {status: 'unanswered'}}
			);
		} else {
			alert('You can only mark Prayer requests you have created.');
		}
	}
};
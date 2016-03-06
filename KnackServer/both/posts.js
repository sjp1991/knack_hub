Posts = new Mongo.Collection('posts')
Earners = new Mongo.Collection('earners')
Employers = new Mongo.Collection('employers')
Tasks = new Mongo.Collection('tasks')
Agencies = new Mongo.Collection('agencies')
Classes = new Mongo.Collection('classes')
Badges = new Mongo.Collection('badges')

Meteor.methods({
  'addPost': function() {
    Posts.insert({title: 'Post ' + Random.id()});
  },

  'deletePost': function() {
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  }

  createEarner(earnerInfo){
  	let userId = Meteor.userId()
  	let {firstName, lastName, pic, desc, phone} = earnerInfo
  	Earners.insert({firstName, lastName, pic, desc, phone, earnedBadges: [], appliedTasks: [], appliedClasses: [], userId})
  },

  registerClass(classId){
  	let userId = Meteor.userId()
  	// increase the signedUpNum
  	Classes.update(classId, {$inc: {signedUpNum: 1}})
  	// add class to earner 
  	Earners.update({userId}, {$addToSet:{appliedClasses: classId}})
  },

  earnBadge(badgeId){
  	let userId = Meteor.userId()
  	Earners.update({userId},{$addToSet:{earnedBadges:badgeId}})
  },

  createEmployer(employerInfo){
  	let userId = Meteor.userId()
  	let {firstName, lastName, cName, address, industry, phone, description} = employerInfo
  	Employers.insert({firstName, lastName, cName, address, industry, phone, description, postedTasks:[], userId})
  },

  postTask(taskInfo){
  	let userId = Meteor.userId()
  	let {wage, location, description, requiredBadgeId} = taskInfo
  	Tasks.insert({wage, location, description, requiredBadgeId, userId})

  },

  createAgency(agencyInfo){
  	let userId = Meteor.userId()
  	let {name, address, phone, description} = agencyInfo
  	Agencies.insert({name, address, phone, description, userId})
  },

  createClass(classInfo){
  	let userId = Meteor.userId()
  	let {name, description, location, size, signedUpNum, badgeId, startDate, endDate} = classInfo
  	Classes.insert({name, description, location, size, signedUpNum, badgeId, startDate, endDate, userId})
  },

  createBadge(badgeInfo){
  	let userId = Meteor.userId()
  	let {title, pic, description, category} = badgeInfo
  	Badges.insert({title, pic, description, category, userId})
  },

})

Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    for (i = 1; i <= 10; i++) {
      Posts.insert({title: 'Post ' + Random.id()});
    }
  }
});

Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('earners', function() {
  return Earners.find();
});

Meteor.publish('tasks', function() {
  return Tasks.find();
});

Meteor.publish('classes', function() {
  return Classes.find();
});

Meteor.publish('agencies', function() {
  return Agencies.find();
});

Meteor.publish('employers', function() {
  return Employers.find();
});

Meteor.publish('badges', function() {
  return Badges.find();
});

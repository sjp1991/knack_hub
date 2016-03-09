Meteor.startup(()=>{
  if (Posts.find().count() === 0) {
    for (i = 1; i <= 10; i++) {
      Posts.insert({title: 'Post ' + Random.id()})
    }
  }
})
Meteor.publish('posts', ()=> {
  return Posts.find()
})
Meteor.publish('earners', ()=> {
  return Earners.find()
})
Meteor.publish('tasks', ()=> {
  return Tasks.find()
})
Meteor.publish('classes', ()=> {
  return Classes.find()
})
Meteor.publish('agencies', ()=> {
  return Agencies.find()
})
Meteor.publish('employers', ()=> {
  return Employers.find()
})
Meteor.publish('badges', ()=> {
  return Badges.find()
})

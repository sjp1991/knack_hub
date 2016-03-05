Posts = new Mongo.Collection('posts');

Meteor.methods({
  'addPost': function() {
    console.log('addPost')
    Posts.insert({title: 'Post ' + Random.id()});
    console.log(Meteor.user())
  },

  'deletePost': function() {
    let post = Posts.findOne();
    if (post) {
      Posts.remove({_id: post._id});
    }
  },

  register(email, password) {
  	console.log(email)
    console.log(password)
  	Accounts.createUser({
  		email,
  		password,
  	})
  }
})

var UserView = Backbone.View.extend({
  userViews: {},
  initialize: function() {
    var self = this;
    /*this.navView = new NavigationElementView({
      name: "Users",
      size: {
        width: 320,
        height: 400
      }
    });*/
    
    this.setElement(ich.userNavContentTmpl()); 
    //$(this.navView.elNavContent).html(this.el); 
    
    this.userCollection = new UserCollection();
    this.userCollection.on("add", $.proxy(this.onNewUser, this));
    this.userCollection.on("remove", $.proxy(this.onRemoveUser, this));
    
    this.userInfo = ich.userNavUserCountTmpl();
    $("body").append(this.userInfo);
    
        
  },  
  events: {
 
  },
  
  updateUserInfo: function() {
    var i = 0;
    for (view in this.userViews) {
      i++;
    }
    
    $(this.userInfo).text("<strong>"+i+"</strong> user active")
  },
  
  onNewUser: function(user) {
    var knv = new UserNavView({
      model: user,
      navContent: this.el
    });
    this.userViews[user.get("id")] = knv;
    this.updateUserInfo();
  },
  
  onRemoveUser: function(user) {
    if (this.userViews[user.get("id")]) {
      this.userViews[user.get("id")].removeUser();
      this.userViews[user.get("id")].remove();
      delete this.userViews[user.get("id")];
    }    
    
    this.updateUserInfo();
  }
  
});



// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic.contrib.ui.tinderCards', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    ionic.Platform.fullScreen()
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
      StatusBar.hide();
    }
    StatusBar.hide();
  });
})

.factory("Data", ['$http', '$rootScope',
    function ($http, $rootScope) { 

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        var serviceBase = "http://10.0.14.77/successApi/v1/";

        var obj = {};
       
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // .state('app', {
  //   url: "/app",
  //   abstract: true,
  //   templateUrl: "templates/rubyonic/menu.html",
  //   controller: 'AppCtrl'
  // })


  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/login.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/profile.html"
      }
    }
  })

   .state('app.add-feed', {
    url: "/add-feed",
    views: {
      'menuContent': {
        templateUrl: "templates/Replug/add-feed.html"
      }
    }
  })
   
  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/forms.html"
      }
    }
  })

  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "templates/Replug/feed.html"
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/Replug/settings.html"
      }
    }
  })

  .state('app.chat-list', {
    url: "/chat-list",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/chat-list.html"
      }
    }
  })

  .state('app.chat-ui', {
    url: "/chat-ui",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/chat-ui.html"
      }
    }
  })

  .state('app.view-post', {
    url: "/view-post",
    views: {
      'menuContent': {
        templateUrl: "templates/rubyonic/view-post.html"
      }
    }
  })

  .state('app.tinder-one', {
    url: "/tinder-one",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-one.html"
      }
    }
  })

  .state('app.tinder-two', {
    url: "/tinder-two",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-two.html"
      }
    }
  })

  .state('app.tinder-three', {
    url: "/tinder-three",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-three.html"
      }
    }
  })

  .state('app.tinder-four', {
    url: "/tinder-four",
    views: {
      'menuContent': {
        templateUrl: "templates/tinder/tinder-four.html"
      }
    }
  })

  /* Replug routing setup */

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/replug/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/main.html",
        controller: 'mainController'
      }
    }
  })

  .state('app.setup', {
    url: "/setup",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/setup.html",
        controller: 'SetupController'
      }
    }
  })
  .state('app.weather', {
    url: "/weather",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/weather.html"
      }
    }
  })

  .state('app.faq', {
    url: "/faq",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/faq.html"
      }
    }
  })

  .state('app.emergency', {
    url: "/emergency",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/emergency.html"
      }
    }
  })

  .state('app.about-us', {
    url: "/about-us",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/about-us.html"
      }
    }
  })

  .state('app.records', {
    url: "/records",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/records.html"
      }
    }
  })


.state('app.intro', {
    url: "/intro",
    views: {
      'menuContent': {
        templateUrl: "templates/replug/intro.html"
      }
    }
  })

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/intro');
});

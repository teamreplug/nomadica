angular.module('starter.controllers', ['ngStorage'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//   ////uncomment from here to 
//     //Notification template

//   //a function to be used in the request
//   $scope.refresh_location = function(){
//     var posOptions = {timeout: 10000, enableHighAccuracy: false};
//   $cordovaGeolocation
//     .getCurrentPosition(posOptions)
//     .then(function (position) {
//       var lat  = position.coords.latitude
//       var long = position.coords.longitude
//       Data.post('API_URL', Json_Format to be Posted).then(function(response){
//         //do something
//       })
//     }, function(err) {
//       // error
//     });
//   }
//   //to check location
//     var posOptions = {timeout: 10000, enableHighAccuracy: false};
//   $cordovaGeolocation
//     .getCurrentPosition(posOptions)
//     .then(function (position) {
//       var lat  = position.coords.latitude
//       var long = position.coords.longitude
//       Data.post('API_URL', Json_Format to be Posted).then(function(response){
//         //do something
//       })
//     }, function(err) {
//       // error
//     });
//     ///to watch for location every  1 hour
//         var watchOptions = {
//         timeout : 3600000,
//         enableHighAccuracy: false // may cause errors if true
//       };

//       var watch = $cordovaGeolocation.watchPosition(watchOptions);
//       watch.then(
//         null,
//         function(err) {
//           // error
//         },
//         function(position) {
//           var lat  = position.coords.latitude
//           var long = position.coords.longitude
//           Data.post('API_URL', Json_Format to be Posted).then(function(response){
//         //do something
//       })
//       });
//       ///Stop uncommenting
// //////////
  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('NavigationCtrl', function($scope, $state,$ionicHistory) {

  // Function to go states. We're using ng-click="go('app.state')" in all our anchor tags
  $scope.go = function(path){
      // console.log('working. Click was Triggered');
      $state.go(path);
      console.log($ionicHistory.viewHistory());
  }

  //Function to go back a step using $ionicHistory
  $scope.goBackAStep = function(){
      console.log('clicked');
      $ionicHistory.goBack();
  }

})

/* Replug Controller */

.controller('SetupController', function($rootScope,$scope,Data,$ionicLoading,$state,$cordovaDevice){
  $scope.showAlert = function(msg) {
     var alertPopup = $ionicPopup.alert({
     title: 'Info',
     template: msg
     });
   };

  $scope.submitSetup = function (userDetails){

    $ionicLoading.show();
     document.addEventListener("deviceready", function () {

    $scope.platform = $cordovaDevice.getPlatform();

    $scope.uuid = $cordovaDevice.getUUID();

    $socpe.version = $cordovaDevice.getVersion();

  }, false);
    Data.post('setUp', {"name": userDetails.name, "phone": userDetails.phone, "device_type":$scope.platform , "device_version": $scope.version,"device_imei":$scope.uuid})
    .then(function(response){

      $ionicLoading.hide();
      if(response.status === "success" || response.status === "info"){
        //local store the response
        $localStorage.User = response;
        $rootScope.userId = response._id;
        $state.go("app.main");
      }else{

        console.log(response.message);

      }

    }, function(error){

        //popup

        $scope.authMsg = "Sorry! an unknown error occured, please try later";
        $scope.showAlert($scope.authMsg);

        console.log(error);

    })
  }
})


.controller('JCardsCtrl', function($scope) {
  console.log('CARDS CTRL Initiated');
   var cardTypes = [
    { 
      image: 'img/demo/tinder-full-pic.jpg', 
      title: 'Samantha Gamblesx', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : false
    },
    { 
      image: 'img/demo/tinder-full-pic-2.jpg', 
      title: 'Junior Max', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : true
    },
    { 
      image: 'img/demo/tinder-full-pic-3.jpg', 
      title: 'Karla Valentine', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : true
    }
  ];

  $scope.cardsControl = {};
  
  $scope.reload = function() {
    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    //we'll need to have a counter for the cards deck
    $scope.cardCounter = $scope.cards.length;

    //we'll need a variable to tell us if the deck is empty or full. since we're reloading, default is false
    $scope.deckIsEmpty = false;

    //we'll clone our $scope.cards for our own custom functions (like counting and exposing card data)
    $scope.cardDataArray = $scope.cards.slice(0);

    //If a card is swyped, its details will always be here. if we are resetting/updating the stack, 
    // this variable will be reset. refer to the $scope.exposeSwypedCard function
    $scope.swypedCard = null;

    // debug data
    console.log('cards in deck: '+$scope.cards.length);
  }

  $scope.exposeSwypedCard = function() {
    //since a card has been removed from deck, reduce counter by 1 
    //we're doing this to balance the 0-notation of arrays vs the array.lenght
    $scope.cardCounter -= 1;

    //if deck is empty set variable to true
    if ($scope.cardCounter === 0){
      $scope.deckIsEmpty = true;
      console.log('deck is empty!');
    }
    

    //we'll use the cardCounter as the index in our cloned array for that card's 
    //data
    $scope.swypedCard = $scope.cardDataArray[$scope.cardCounter];


    //output to console. use to your preference
    console.log($scope.swypedCard);
  }

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  
  $scope.yesClick = function() {
    $scope.cardsControl.swipeRight();
  };
  
  $scope.noClick = function() {
    $scope.cardsControl.swipeLeft();
  };
  
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.exposeSwypedCard();
  };
  
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.exposeSwypedCard();
  };

  $scope.cardDetails = function(card) {

  }
  
  $scope.reload()
});
//controller for feeds
// .controller('FeedController', function($scope,$rootScope,Data){
//   $scope.submit = function(FeedDetails){
//     $ionicLoading.show();
//     Data.post('addFeed', {
//       "user_id":$localStorage.user_id,
//       "title": FeedDetails.title,
//       "content": FeedDetails.content,
//       "location_lon":$localStorage.current.lon,
//       "location_lat":$localStorage.current.lat,
//       "location_area":$localStorage.current.area
//     }).then(function(response){
//       $ionicLoading.hide();
//       if(response.message === "success"){
//         //do something.
//       }
//     })
//   }
// })
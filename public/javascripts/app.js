var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http)
{
    $scope.message="";
    $scope.qResNear = function() {
        var request = $http.get('/data/'+$scope.hotelName);
        request.success(function(data)
        {
            
            $scope.data = data;
        });
        request.error(function(data)
        {
            console.log('err');
        });
    
    };

    $scope.qCityHotel = function(){
        var request = $http.get('/qCityHotel/'+$scope.cityName);
        request.success(function(data)
        {
            $scope.data = data;
        });
        request.error(function(data)
        {
            console.log('err');
        });
    }
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js

app.controller('insertController', function($scope, $http)
{
    $scope.message = "";
    $scope.Insert = function()
    {
        var request = $http.get('/data/login/'+$scope.login+'/name/' + $scope.name +
            '/sex/' + $scope.sex + '/RelationshipStatus/' + $scope.RelationshipStatus +
            '/Birthyear/' + $scope.Birthyear);
        request.success(function(data)
        {
            $scope.data = data;
            console.log('insert returned data: ' + data);
        });
        request.error(function(data)
        {
            console.log('err');
        });
    }
});

app.controller('familyController', function($scope, $http)
{
    $scope.message = "";
    var request = $http.get('/personDropDown');
    request.success(function(datadrop)
    {
        $scope.datadrop = datadrop;
        console.log('drop down data: ' + datadrop);
    });
    request.error(function(data)
    {
        console.log('err');
    });
    $scope.Family = function()
    {
        var request = $http.get('/person/'+$scope.name);
        request.success(function(data)
        {
            $scope.data = data;
            console.log('insert returned data: ' + data);
        });
        request.error(function(data)
        {
            console.log('err');
        });
    }
    $scope.DropDown = function()
    {
        var request = $http.get('/personDropDown');
        request.success(function(datadrop)
        {
            $scope.datadrop = datadrop;
            console.log('drop down data: ' + datadrop);
        });
        request.error(function(data)
        {
            console.log('err');
        });
    }
});

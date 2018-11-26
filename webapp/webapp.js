angular.module('DATNDPU', [
    'ngRoute',
    'mobile-angular-ui',
	'btford.socket-io'
]).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'Home'
    });
}).factory('mySocket', function (socketFactory) {
	var myIoSocket = io.connect('/webapp');	//Tên namespace webapp

	mySocket = socketFactory({
		ioSocket: myIoSocket
	});
	return mySocket;
}).controller('Home', function($scope, mySocket) {
	////Khu 1 -- Khu cài đặt tham số 
    //cài đặt một số tham số test chơi
	//dùng để đặt các giá trị mặc định
	$scope.buttons = [] //chả có gì cả, arduino gửi nhiêu thì nhận nhiêu!
	
	////Khu 2 -- Cài đặt các sự kiện khi tương tác với người dùng
	//các sự kiện ng-click, nhấn nút
	$scope.updateSensor  = function() {
		mySocket.emit("RAIN")
	}
	
	
	//Cách gửi tham số 1: dùng biến toàn cục! $scope.<tên biến> là biến toàn cục
	$scope.changeLED = function() {
		console.log("send LED ", $scope.leds_status)
		
		var json = {
			"led": $scope.leds_status
		}
		mySocket.emit("LED", json)
	}
	
	
	

	 $scope.upt5  = function(){
	var ip = document.getElementById('ip').value;
		mySocket.emit("LED1ON"+ip)
    
	}
	$scope.upt51  = function(){
	     var ip = document.getElementById('ip').value;
		mySocket.emit("LED1OFF"+ip)
	}
	$scope.upt6  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED2ON"+ip)
	}
	$scope.upt61  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED2OFF"+ip)
	}
	$scope.upt7  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED3ON"+ip)
	}
	$scope.upt71  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED3OFF"+ip)
	}
	$scope.upt8  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED4ON"+ip)
	}
	$scope.upt81  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("LED4OFF"+ip)
	}
		$scope.upt9  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("ONALL"+ip)
	}
	$scope.upt91  = function(){
		var ip = document.getElementById('ip').value;
		mySocket.emit("OFFALL"+ip)
	}
	
	//khi nhận được lệnh Button
	mySocket.on('BUTTON', function(json) {
		//Nhận được thì in ra thôi hihi.
		console.log("recv BUTTON", json)
		$scope.buttons = json.data
	})


	//khi nhận được lệnh Button
	mySocket.on('BUTTON', function(json) {
		//Nhận được thì in ra thôi hihi.
		console.log("recv BUTTON", json)
		$scope.buttons = json.data
	})
	
	
	//// Khu 4 -- Những dòng code sẽ được thực thi khi kết nối với Arduino (thông qua socket server)
	mySocket.on('connect', function() {
		console.log("connected")
		mySocket.emit("RAIN") //Cập nhập trạng thái mưa
		
		$scope.updateServo(0) //Servo quay về góc 0 độ!. Dùng cách 2 
	})
		
});

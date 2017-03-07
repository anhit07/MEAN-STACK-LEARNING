angular.module('myHotelsApp').controller('RegisterController', RegisterController);

function RegisterController($http) {
	var vm = this;

	vm.register = function() {
		var user = {
			username: vm.username,
			password: vm.password
		};

		if(!vm.username || !vm.password) {
			vm.error = 'Please add a username and a password';
		} else {
			if(vm.password !== vm.passwordRepeat) {
				vm.error = 'Passwords dont match. Please enter again';
			} else {
				$http.get('/api/users/' +  user.username).then(function(result){
					if(result.data.isExistingUser === true){
						vm.error =  'User already exists';
					} else {
						$http.post('/api/users/register', user).then(function(result){
							console.log(result);
							vm.message = 'Successful registration';
							vm.error = '';
						}).catch(function(error){
							console.log(error);
						});
					}
				});
			}
		}
	}	

}


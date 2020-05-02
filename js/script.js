const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwrod2 = document.getElementById('password2');

//Show input error message
function showError(input,errmsg){	
	const formControl = input.parentElement;
	formControl.className = 'form-control error';

	const small = formControl.querySelector('small');
	small.innerText = errmsg;
}

//Show uccess outline
function showSuccess(input){
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(input){
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	// return re.test(String(input).toLowerCase());
	if(re.test(input.value.trim())){
		showSuccess(input);
	}else{
		showError(input,'Email is not valid');
	}
}

//Check required fields
function checkRequired(inputArr){
	inputArr.forEach(inp=>{
		console.log(inp.value,'value');
		if(inp.value.trim() === '' ){
			showError(inp, `${getFieldName(inp)} is required`);
		}else{
			showSuccess(inp);
		}
	})
}

// Return field name after changing first letter of it with uppercase 
function getFieldName(input){
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check length of fields
function checkLength(input, min, max) {
	if(input.value.length < min){
		showError(input, `${getFieldName(input)} must be at least ${min}`);
	}else if(input.value.length>max){
		showError(input,`${getFieldName(input)} must be less than ${max} characters`);

	}
}

//Check passwords match
function checkPasswordsMatch(pass1,pass2) {
	if(pass1.value !== pass2.value){
		showError(pass2,'Passwords do not match');
	}
}

//EventListener
form.addEventListener('submit', function(e){
	e.preventDefault();
	checkRequired([username,email,password,passwrod2]);
	checkLength(username,3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, passwrod2);
});
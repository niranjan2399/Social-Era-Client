import React from 'react'
import './Register.scss'

function Register() {
	function register(e) {
		e.preventDefault();
	}
	return (
		<div className='register'>
			<h2>Registration</h2>
			<form onSubmit={register}>
				<input type="text" name="" id="" placeholder='First Name' />
				<input type="text" name="" id="" placeholder='Last Name' />
				<input type="text" name="" id="" placeholder='Username' />
				<input type="password" name="" id="" placeholder='Password' />
				<button>Register</button>
			</form>
		</div>
	)
}

export default Register

import React from 'react'
import { Link } from 'react-router-dom';
import './register.scss'

function Register() {
	function register(e) {
		e.preventDefault();
	}
	return (
		<div className='register'>
			<form onSubmit={register}>
				<input type="text" name="" id="" placeholder='First Name' />
				<input type="text" name="" id="" placeholder='Last Name' />
				<input type="text" name="" id="" placeholder='Email' />
				<input type="text" name="" id="" placeholder='Username' />
				<input type="password" name="" id="" placeholder='Password' />
				<button>Register</button>
			</form>
			<Link to='/login'>Already a user?</Link>
		</div>
	)
}

export default Register

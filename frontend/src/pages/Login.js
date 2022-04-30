import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { reset, login } from '../features/Auth/authSlice';
import Spinner from '../component/Spiner';
function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispath = useDispatch();

	const { isLoading, isSuccess, isError, message, user } = useSelector(
		(state) => state.auth
	);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email,
			password,
		};

		dispath(login(userData));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispath(reset());
	}, [isError, isSuccess, message, user, dispath, navigate]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login and set your goals</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Enter your password'
							onChange={onChange}
						/>
					</div>

					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login;

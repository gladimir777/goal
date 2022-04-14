import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { _logOut, reset } from '../features/Auth/authSlice';
function Header() {
	const navigate = useNavigate();
	const dispath = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = (e) => {
		dispath(_logOut());
		dispath(reset());
		navigate('/');
	};
	return (
		<header className='header'>
			<Link to='/'>Goal Setter</Link>
			<div className='logo'>
				<ul>
					{user ? (
						<li>
							<button className='btn' onClick={onLogout}>
								<FaSignOutAlt />
								Logout
							</button>
						</li>
					) : (
						<>
							<li>
								<Link to='/login'>
									<FaSignInAlt />
									Login
								</Link>
							</li>
							<li>
								<Link to='/Register'>
									<FaUser />
									Register
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
}

export default Header;

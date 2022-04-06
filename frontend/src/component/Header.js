import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<header className='header'>
			<Link to='/'>Goal Setter</Link>
			<div className='logo'>
				<ul>
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
				</ul>
			</div>
		</header>
	);
}

export default Header;

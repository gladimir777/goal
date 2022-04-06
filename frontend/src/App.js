import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './component/Header';
function App() {
	return (
		<>
			<Router>
				<div className='container'>
					<Header />
					<Routes>
						<Route element={<Dashboard />} path='/'></Route>
						<Route element={<Login />} path='/login'></Route>
						<Route element={<Register />} path='/register'></Route>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;

import { useState } from 'react';
import './styles/App.css';
import notebook from './images/note.png';
import StripeContainer from './components/StripeContainer';

function App() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='container'>
			<h1 className='title'>Notebook Dell Alienware</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>R$10.000,00</h3>
					<img src={notebook} alt='notebook' className='notebook' />
					<button className='button' onClick={() => setShowItem(true)}>Buy now</button>
				</>
			)}
		</div>
	);
}

export default App;

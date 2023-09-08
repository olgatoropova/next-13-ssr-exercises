'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
	const [items, dispatch] = React.useReducer(reducer, []);
	const [status, setStatus] = React.useState('loading');

	React.useEffect(() => {
		const savedItems = window.localStorage.getItem('cart-items');

		//console.log('getItems=', savedItems);
		if (savedItems !== null) {
			dispatch({
				type: 'load',
				items: JSON.parse(savedItems)
			});
		}

		setStatus('success');
	}, []);

	React.useEffect(() => {
		window.localStorage.setItem('cart-items', JSON.stringify(items));
		//console.log('storage=', window.localStorage.getItem('cart-items'));
	}, [items]);

	return (
		<>
			<h1>Neighborhood Shop</h1>

			<main>
				<div className="items">
					{DATA.map((item) => (
						<StoreItem
							key={item.id}
							item={item}
							handleAddToCart={(item) => {
								dispatch({
									type: 'add-item',
									item
								});
							}}
						/>
					))}
				</div>

				<CheckoutFlow
					items={items}
					status={status}
					taxRate={0.15}
					handleDeleteItem={(item) =>
						dispatch({
							type: 'delete-item',
							item
						})
					}
				/>
			</main>
		</>
	);
}

export default CheckoutExercise;

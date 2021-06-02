import React from 'react';
import { CustomerBids, Table } from './containers';
import { Router } from '@reach/router';
import { Routes } from './repos';
import { CustomerProvider } from './repos';

function App() {
	return (
		<CustomerProvider>
			<Router>
				<Table path={Routes.Home} default />
				<CustomerBids path={Routes.Bids} />
			</Router>
		</CustomerProvider>
	);
}

export default App;

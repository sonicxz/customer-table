import { useState, useEffect } from 'react';
import { Customer, URL } from '../repos';

export const useFetchCustomer = () => {
	const [customerData, setCustomerData] = useState<Customer[]>();

	console.log(customerData);

	useEffect(() => {
		fetch(URL.Customer)
			.then((res) => res.json())
			.then((data) => {
				setCustomerData(data);
			});
	}, []);

	return customerData;
};

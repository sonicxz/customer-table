import { createContext, ReactNode, useState } from 'react';
import { Customer } from '.';
import { useFetchCustomer } from '../hooks';

export interface CustomerContextProps {
	customerData: Customer[] | undefined;
	setCustomer: (customer: Customer) => void;
	customer: Customer | undefined;
}

export const CustomerContext = createContext<CustomerContextProps>(null!);

export const CustomerProvider = (props: { children: ReactNode }) => {
	const customerData = useFetchCustomer();
	const [customer, setCustomer] = useState<Customer>();

	return (
		<CustomerContext.Provider value={{ customerData, setCustomer, customer }}>
			{props.children}
		</CustomerContext.Provider>
	);
};

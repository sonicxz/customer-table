import { navigate, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useCustomerContext } from '../../hooks';
import {
	TableContainer,
	TableCell,
	Table as MuiTable,
	TableBody,
	Paper,
	makeStyles,
	TableRow,
	TableHead,
	Avatar,
	Box,
} from '@material-ui/core';
import { Routes } from '../../repos';

interface CustomerBidsProps extends RouteComponentProps {}
const CustomerBids = (props: CustomerBidsProps) => {
	const { customer } = useCustomerContext();

	if (!customer) {
		alert('Please select a customer');
		navigate(Routes.Home);
		return null;
	}

	return (
		<Box display="flex" justifyContent="center" mt={8} flexDirection="column">
			<Box display="flex" alignItems="center">
				<Avatar src={customer.avatarUrl} style={{ margin: '1rem' }}></Avatar>
				<h1>{`${customer.firstname} ${customer.lastname}`}</h1>
			</Box>
			<TableContainer component={Paper}>
				<MuiTable>
					<TableHead>
						<TableRow>
							<TableCell>Car Title</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Created At</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{customer.bids.map((bid) => {
							return (
								<TableRow key={bid.id}>
									<TableCell>{bid.carTitle}</TableCell>
									<TableCell>{bid.amount}</TableCell>
									<TableCell>{bid.created}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</Box>
	);
};

export default CustomerBids;

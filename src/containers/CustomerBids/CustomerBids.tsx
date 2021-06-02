import { RouteComponentProps } from '@reach/router';
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
	TableFooter,
	Box,
} from '@material-ui/core';

interface CustomerBidsProps extends RouteComponentProps {}
const CustomerBids = (props: CustomerBidsProps) => {
	const { customer } = useCustomerContext();
	return (
		<Box display="flex" justifyContent="center" mt={8}>
			<Avatar src={customer?.avatarUrl}></Avatar>
			<h1>{customer?.firstname}</h1>
			<TableContainer component={Paper}>
				<MuiTable></MuiTable>
			</TableContainer>
		</Box>
	);
};

export default CustomerBids;

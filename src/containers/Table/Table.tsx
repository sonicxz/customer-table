import React, { useState, MouseEvent, ChangeEvent } from 'react';
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
	TablePagination,
	CircularProgress,
	Box,
	Switch,
	FormControlLabel,
	FormGroup,
} from '@material-ui/core';
import { useFetchCustomer } from '../../hooks';
import { TablePaginationActions } from '.';
import { Bid } from '../../repos';

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	avatar: {
		marginRight: '1rem',
	},
});

const Table = () => {
	const classes = useStyles();
	const customerData = useFetchCustomer();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [isBidSortMax = false, setBidSortMax] = useState<boolean>();
	// const emptyRows =
	// 	rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
	const pageChangeHandler = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const rowsPerPageChangeHandler = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (!customerData) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
			>
				<CircularProgress size={80}></CircularProgress>
			</Box>
		);
	}

	const bidsSorter = (bids: Bid[]) => {
		bids.sort((a, b) => a.amount - b.amount);
		const lastIndex = bids.length - 1;
		switch (isBidSortMax) {
			case true:
				return bids[lastIndex].amount;
			default:
				return bids[0].amount;
		}
	};

	return (
		<TableContainer component={Paper}>
			{/*@ts-ignore*/}
			<MuiTable className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Customer Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Premium</TableCell>
						<TableCell>
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											checked={isBidSortMax}
											onChange={() => setBidSortMax((prev) => !prev)}
											name="BidSort"
										/>
									}
									label={isBidSortMax ? 'Max Bid' : 'Min Bid'}
								/>
							</FormGroup>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(customerData && rowsPerPage > 0
						? customerData.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
						  )
						: customerData
					)?.map((customer, index) => {
						return (
							<TableRow key={customer.id}>
								<TableCell>
									<Box display="flex" alignItems="center">
										<Avatar
											alt="customer-avatar"
											className={classes.avatar}
											src={customer.avatarUrl}
										/>
										{`${customer.firstname} ${customer.lastname}`}
									</Box>
								</TableCell>
								<TableCell>{customer.email}</TableCell>
								<TableCell>{customer.phone}</TableCell>
								<TableCell>
									{customer.hasPremium ? 'Has Premium' : 'No Premium'}
								</TableCell>
								<TableCell>{bidsSorter(customer.bids)}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
							colSpan={3}
							count={customerData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onChangePage={pageChangeHandler}
							onChangeRowsPerPage={rowsPerPageChangeHandler}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</MuiTable>
		</TableContainer>
	);
};

export default Table;

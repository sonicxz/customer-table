import React, { MouseEvent } from 'react';
import { makeStyles, useTheme, IconButton } from '@material-ui/core';
import {
	FirstPage as FirstPageIcon,
	LastPage as LastPageIcon,
	KeyboardArrowRight,
	KeyboardArrowLeft,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
	const classes = useStyles();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const firstPageButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, 0);
	};

	const backButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page - 1);
	};

	const nextPageButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page + 1);
	};

	const lastPageButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	const disabled = page >= Math.ceil(count / rowsPerPage) - 1;

	return (
		<div className={classes.root}>
			<IconButton onClick={firstPageButtonHandler} disabled={page === 0}>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={backButtonHandler} disabled={page === 0}>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton onClick={nextPageButtonHandler} disabled={disabled}>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton onClick={lastPageButtonHandler} disabled={disabled}>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
};

export default TablePaginationActions;

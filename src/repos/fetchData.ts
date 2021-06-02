export interface Bid {
	id: string;
	carTitle: string;
	amount: number;
	created: string;
}

export interface Customer {
	id: string;
	firstname: string;
	lastname: string;
	avatarUrl: string;
	email: string;
	phone: string;
	hasPremium: boolean;
	bids: Bid[];
}

export enum URL {
	Customer = 'https://intense-tor-76305.herokuapp.com/merchants',
}

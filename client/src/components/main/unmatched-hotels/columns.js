import { formatDate, formatNum, formatCurrency, formatPercent } from 'helper'
//local helper
import { getActions } from './helper'

export const columns = [
	{
		title: 'Converted Room Spend',
		width: 150,
		dataIndex: 'roomSpend',
		fixed: 'left',
		render: (num) => formatCurrency(num),
	},
	{
		title: 'Match %',
		width: 100,
		dataIndex: 'bestMatchScore',
		fixed: 'left',
		render: (num) => formatPercent(num),
	},
	{
		title: 'Hotel Name',
		dataIndex: 'hotelName',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'Chain',
		dataIndex: 'hotelChainName',
		width: 150,
	},
	{
		title: 'Source Type',
		dataIndex: 'templateCategory',
		width: 150,
	},
	{
		title: 'Source Name',
		dataIndex: 'sourceName',
		width: 150,
	},
	{
		title: 'Room Nights',
		dataIndex: 'numberOfNights',
		width: 150,
		render: (num) => formatNum(num),
	},
	{
		title: 'Ingested Date',
		dataIndex: 'uploadTimestamp',
		width: 150,
		render: (date) => formatDate(date),
	},
	{
		title: 'Address 1',
		dataIndex: 'address1',
		width: 200,
	},
	{
		title: 'Address 2',
		dataIndex: 'address2',
		width: 150,
	},
	{
		title: 'City Name',
		dataIndex: 'cityName',
		width: 150,
	},
	{
		title: 'State',
		dataIndex: 'stateCode',
		width: 100,
	},
	{
		title: 'Country Name',
		dataIndex: 'countryName',
		width: 150,
	},
	{
		title: 'Phone Number',
		dataIndex: 'phoneNumber',
		width: 150,
	},
	{
		title: 'Actions',
		width: 200,
		fixed: 'right',
		render: (_, record) => getActions(record),
	},
]

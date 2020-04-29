import { formatPhoneNumber } from 'helper'
import { getConfidence } from './helper'

export const columns = [
	{
		title: 'HMF ID',
		width: 100,
		dataIndex: 'stageActivityHotelId',
		fixed: 'left',
	},
	{
		title: 'Confidence',
		width: 130,
		dataIndex: 'confidenceScore',
		fixed: 'left',
		render: (num) => getConfidence(num),
	},
	{
		title: 'Hotel Name',
		dataIndex: 'hotelName',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'Address 1',
		dataIndex: 'address1',
		width: 150,
	},
	{
		title: 'Address 2',
		dataIndex: 'address2',
		width: 150,
	},
	{
		title: 'State',
		dataIndex: 'stateCode',
		width: 100,
	},
	{
		title: 'City',
		dataIndex: 'cityName',
		width: 150,
	},
	{
		title: 'Country',
		dataIndex: 'countryName',
		width: 100,
	},
	{
		title: 'Phone',
		dataIndex: 'phoneNumber',
		width: 150,
		render: (num) => formatPhoneNumber(num),
	},
	{
		title: 'Chain Name',
		dataIndex: 'hotelChainName',
		width: 150,
	},
	{
		title: 'Brand Name',
		dataIndex: 'hotelBrandName',
		width: 150,
	},
	{
		title: 'Lanyon ID',
		dataIndex: 'lanyonId',
		width: 100,
	},
	{
		title: 'Sabre ID',
		dataIndex: 'sabePropertyId',
		width: 100,
	},
	{
		title: 'Apollo ID',
		dataIndex: 'apolloPropertyId',
		width: 100,
	},
	{
		title: 'Amadeus ID',
		dataIndex: 'amadeusPropertyId',
		width: 130,
	},
	{
		title: 'Worldspan ID',
		dataIndex: 'worldspanPropertyId',
		width: 130,
	},
	{
		title: 'Actions',
		width: 100,
		fixed: 'right',
	},
]

import { formatDate, formatNum, formatCurrency, formatPercent } from 'helper'
//local helper
import { getStaus, getStatus } from './helper'

// Cell width (in pixels)
// const [small, med, large] = [75, 100, 150]

export const columns = [
	{
		title: 'Job ID',
		width: 75,
		dataIndex: 'jobIngestionId',
		fixed: 'left',
	},
	{
		title: 'Detail Level',
		width: 150,
		dataIndex: 'templateNote',
		fixed: 'left',
	},
	{
		title: 'Source Type',
		dataIndex: 'templateCategory',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'Source Name',
		dataIndex: 'sourceName',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'Loaded By',
		dataIndex: 'loadedBy',
		width: 150,
	},
	{
		title: 'Period Start',
		dataIndex: 'dataStartDate',
		width: 150,
		render: (date) => formatDate(date),
	},
	{
		title: 'Period End',
		dataIndex: 'dataEndDate',
		width: 150,
		render: (date) => formatDate(date),
	},
	{
		title: 'Ingested Date',
		dataIndex: 'uploadTimestamp',
		width: 150,
		render: (date) => formatDate(date),
	},
	{
		title: 'Room Nights',
		dataIndex: 'roomNightsTotal',
		width: 150,
		render: (num) => formatNum(num),
	},
	{
		title: 'Ingested Room Spend',
		dataIndex: 'ingestedRoomSpend',
		width: 200,
		render: (num) => formatCurrency(num),
	},
	{
		title: 'Ingested Currency',
		dataIndex: 'currencyIngested',
		width: 150,
	},
	{
		title: 'Converted Room Spend in USD',
		dataIndex: 'convertedRoomSpendUsd',
		width: 150,
		render: (num) => formatCurrency(num),
	},
	{
		title: 'ABR in USD',
		dataIndex: 'convertedAbrUsd',
		width: 150,
		render: (num) => formatCurrency(num),
	},
	{
		title: 'Conversion Date',
		dataIndex: 'conversionDate',
		width: 150,
		render: (date) => formatDate(date),
	},
	{
		title: 'Row Count',
		dataIndex: 'countRows',
		width: 150,
	},
	{
		title: '# Unmatched Hotels',
		dataIndex: 'unmatchedCount',
		width: 150,
	},
	{
		title: '% Unmatched',
		dataIndex: 'unmatchedCountPercent',
		width: 150,
		render: (num) => formatPercent(num),
	},
	{
		title: 'Status',
		width: 200,
		fixed: 'right',
		render: (_, record) => getStatus(record),
	},
	{
		title: 'Load Actions',
		width: 150,
		fixed: 'right',
	},
]

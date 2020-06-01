import {
	formatDate,
	formatNum,
	formatCurrency,
	formatPercent,
	formatName
} from 'helper'
//local helper
import { getStatus, getActions } from './helper'

export const columns = [
	{
		title: 'Job ID',
		width: 75,
		dataIndex: 'jobIngestionId',
		fixed: 'left'
	},
	{
		title: 'Detail Level',
		width: 130,
		dataIndex: 'templateNote',
		fixed: 'left'
	},
	{
		title: 'Source Type',
		dataIndex: 'templateCategory',
		width: 100,
		fixed: 'left'
	},
	{
		title: 'Source Name',
		dataIndex: 'sourceName',
		width: 100,
		fixed: 'left'
	},
	{
		title: 'Loaded By',
		dataIndex: 'loadedBy',
		width: 150,
		render: (name) => formatName(name)
	},
	{
		title: 'Period Start',
		dataIndex: 'dataStartDate',
		width: 150,
		render: (date) => formatDate(date)
	},
	{
		title: 'Period End',
		dataIndex: 'dataEndDate',
		width: 150,
		render: (date) => formatDate(date)
	},
	{
		title: 'Ingested Date',
		dataIndex: 'uploadTimestamp',
		width: 150,
		render: (date) => formatDate(date)
	},
	{
		title: 'Room Nights',
		dataIndex: 'roomNightsTotal',
		width: 150,
		render: (num) => formatNum(num)
	},
	{
		title: 'Ingested Room Spend',
		dataIndex: 'ingestedRoomSpend',
		width: 200,
		render: (num) => formatCurrency(num)
	},
	{
		title: 'Ingested Currency',
		dataIndex: 'currencyIngested',
		width: 150
	},
	{
		title: 'Converted Room Spend in USD',
		dataIndex: 'convertedRoomSpendUsd',
		width: 150,
		render: (num) => formatCurrency(num)
	},
	{
		title: 'ABR in USD',
		dataIndex: 'convertedAbrUsd',
		width: 150,
		render: (num) => formatCurrency(num)
	},
	{
		title: 'Conversion Date',
		dataIndex: 'conversionDate',
		width: 150,
		render: (date) => formatDate(date)
	},
	{
		title: 'Record Count',
		dataIndex: 'countRows',
		width: 150
	},
	{
		title: '# Unmatched Hotels',
		dataIndex: 'unmatchedCount',
		width: 150
	},
	{
		title: 'Unmatched % Spend',
		dataIndex: 'unmatchedSpendPercent',
		width: 150,
		render: (num) => formatPercent(num)
	},
	{
		title: 'Status',
		width: 150,
		fixed: 'right',
		render: (_, record) => getStatus(record)
	},
	{
		title: 'Load Actions',
		width: 200,
		fixed: 'right',
		render: (_, record) => getActions(record)
	}
]

import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { Checkbox } from 'antd'

const LoadActions = ({ record, selectedRecords, setSelectedRecords }) => {
	const globalState = useContext(store)
	const { dispatch, state } = globalState
	const { records } = state
	const { loading } = records

	const onChange = (type) => {
		//Need to check if id already in there. If so, remove it from array
	}

	const { isDpm, statusDpm, isSourcing, statusSourcing } = record
	const displayArr = []
	if (
		!isDpm ||
		(!isDpm && isSourcing && statusSourcing.toLowerCase() === 'approved')
	) {
		displayArr.push(<Checkbox onChange={() => onChange('DPM')}>DPM</Checkbox>)
	}
	if (
		!isSourcing ||
		(!isSourcing && isDpm && statusDpm.toLowerCase() === 'approved')
	) {
		displayArr.push(<Checkbox>Sourcing</Checkbox>)
	}

	return displayArr.length ? displayArr.map((el, i) => ({ ...el, key: i })) : []
}

export default LoadActions

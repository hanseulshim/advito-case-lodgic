import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import SelectClient from './SelectClient'
import SelectDateRange from './SelectDateRange'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	margin: 5% 0;
	width: 650px;
	> div {
		flex: 1;
		margin-right: 15px;
	}
`

const Controls = () => {
	const globalState = useContext(store)
	const { dispatch } = globalState
	let history = useHistory()

	const [inputs, setInputs] = useState({
		clientId: null,
		dateRange: [],
	})

	const handleClientChange = (e) => {
		setInputs({
			...inputs,
			clientId: e,
		})
	}

	const handleDateChange = (date, dateStringArr) => {
		// Checking here if the user cleared the datepicker
		setInputs({
			...inputs,
			dateRange: dateStringArr.filter((date) => date === '').length
				? []
				: dateStringArr,
		})
	}

	const handleGo = () => {
		dispatch({ type: 'setIngestionContext', value: { inputs } })
		history.push('/ingestion-history')
	}

	return (
		<Container>
			<SelectClient onChange={handleClientChange} />
			<SelectDateRange onChange={handleDateChange} />
			<Button
				type="primary"
				shape="round"
				size="medium"
				disabled={!inputs.clientId || !inputs.dateRange.length}
				onClick={handleGo}
			>
				Go
			</Button>
		</Container>
	)
}

export default Controls

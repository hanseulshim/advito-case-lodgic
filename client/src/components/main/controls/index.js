import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import SelectClient from './SelectClient'
import SelectDateRange from './SelectDateRange'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CLIENT_LIST } from 'api/queries'

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
	const { loading, error, data } = useQuery(CLIENT_LIST)
	const globalState = useContext(store)
	const { dispatch } = globalState
	let history = useHistory()

	const [inputs, setInputs] = useState({
		clientId: null,
		clientName: '',
		dateRange: []
	})

	const handleClientChange = (e) => {
		const clientName = data.clientList.find((client) => client.id === e)
			.clientName

		setInputs({
			...inputs,
			clientId: e,
			clientName
		})
	}

	const handleDateChange = (date, dateStringArr) => {
		// Checking here if the user cleared the datepicker
		setInputs({
			...inputs,
			dateRange: dateStringArr.filter((date) => date === '').length
				? []
				: dateStringArr
		})
	}

	const handleGo = () => {
		dispatch({ type: 'setIngestionContext', value: { inputs } })
		history.push('/ingestion-history')
	}

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	return (
		<Container>
			<SelectClient onChange={handleClientChange} clients={data.clientList} />
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

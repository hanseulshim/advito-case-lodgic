import React, { useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Header from './header'
import Navigation from './navigation'
import IngestionHistory from './ingestion-history'
import UnmatchedHotels from './unmatched-hotels'
import WorkRecord from './work-record'
import { Switch, Route } from 'react-router-dom'
import Controls from './controls'

const MainContainer = styled.div`
	padding: ${(props) => props.theme.padding};
	height: 100%;
	width: 1500px;
	margin: 0em auto;
`

const Main = () => {
	let history = useHistory()
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state

	useEffect(() => {
		if (!clientId || !dateRange.length) {
			history.push('/')
		}
	}, [clientId, dateRange, history])

	return (
		<MainContainer>
			<Header />
			<Controls />
			{clientId && dateRange.length ? (
				<>
					<Navigation />
					<Switch>
						<Route path={`/ingestion-history`} component={IngestionHistory} />
						<Route path={`/unmatched-hotels`} component={UnmatchedHotels} />
						<Route path={`/work-record/:recordId`} component={WorkRecord} />
					</Switch>
				</>
			) : null}
		</MainContainer>
	)
}

export default Main

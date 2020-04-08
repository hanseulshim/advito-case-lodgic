import React, { useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import Header from './header'
import Navigation from './navigation'
import IngestionHistory from './ingestion-history'
import UnmatchedHotels from './unmatched-hotels'
import { Switch, Route } from 'react-router-dom'
import Controls from './controls'

const MainContainer = styled.div`
	padding: ${(props) => props.theme.padding};
	height: 100%;
	min-width: 1000px;
	max-width: 1500px;
`

const Main = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state

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
					</Switch>
				</>
			) : null}
		</MainContainer>
	)
}

export default Main

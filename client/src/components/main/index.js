import React, { useContext, useEffect } from 'react'
import { store } from 'context/store'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Header from './header'
import Navigation from './navigation'
import IngestionHistory from './ingestion-history'
import UnmatchedHotels from './unmatched-hotels'
import WorkRecord from './work-record'
import { Switch, Route, Redirect } from 'react-router-dom'
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

	const PrivateRoute = ({ component: Component, ...rest }) => {
		const user = JSON.parse(localStorage.getItem('advito-user'))
		const isSpecialistOrConsultant =
			user.roleIds.includes(16) || user.roleIds.includes(17)
		return (
			<Route
				{...rest}
				render={(props) =>
					isSpecialistOrConsultant ? (
						<Redirect to="/unmatched-hotels" />
					) : (
						<Component {...props} />
					)
				}
			/>
		)
	}

	return (
		<MainContainer>
			<Header />
			<Controls />
			{clientId && dateRange.length ? (
				<>
					<Navigation />
					<Switch>
						<PrivateRoute
							path={`/ingestion-history`}
							component={IngestionHistory}
						/>
						<Route path={`/unmatched-hotels`} component={UnmatchedHotels} />
						<Route path={`/work-record/:record`} component={WorkRecord} />
					</Switch>
				</>
			) : null}
		</MainContainer>
	)
}

export default Main

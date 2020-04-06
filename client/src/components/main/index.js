import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Navigation from './navigation'
import IngestionHistory from './ingestion-history'
import UnmatchedHotels from './unmatched-hotels'
import SelectClient from './SelectClient'
import SelectDateRange from './SelectDateRange'
import { Switch, Route } from 'react-router-dom'
import { Button } from 'antd'

const MainContainer = styled.div`
	padding: ${(props) => props.theme.padding};
	height: 100%;
	min-width: 1000px;
	max-width: 1500px;
`

const Controls = styled.div`
	display: flex;
	align-items: flex-end;
	margin: 5% 0;
	width: 650px;
	> div {
		flex: 1;
		margin-right: 15px;
	}
`

const Main = () => {
	return (
		<MainContainer>
			<Header />
			<Controls>
				<SelectClient />
				<SelectDateRange />
				<Button type="primary" shape="round" size="medium">
					Go
				</Button>
			</Controls>
			<Navigation />
			<Switch>
				<Route path={`/ingestion-history`} component={IngestionHistory} />
				<Route path={`/unmatched-hotels`} component={UnmatchedHotels} />
			</Switch>
		</MainContainer>
	)
}

export default Main

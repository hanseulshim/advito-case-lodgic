import React from 'react'
import styled from 'styled-components'
import SelectClient from './SelectClient'
import SelectDateRange from './SelectDateRange'
import { Button, Tabs } from 'antd'
const { TabPane } = Tabs

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

// const Tabs = styled.div``

const Navigation = () => (
	<>
		<Controls>
			<SelectClient />
			<SelectDateRange />
			<Button type="primary" shape="round" size="medium">
				Go
			</Button>
		</Controls>
		<Tabs type="card">
			<TabPane tab="Ingestion History" key="1">
				Ingesiton History
			</TabPane>
			<TabPane tab="Unmatched Hotels" key="2">
				Unmatched Hotels
			</TabPane>
		</Tabs>
	</>
)

export default Navigation

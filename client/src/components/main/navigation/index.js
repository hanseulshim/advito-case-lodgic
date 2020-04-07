import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Tabs } from 'antd'
const { TabPane } = Tabs

const Navigation = () => {
	let history = useHistory()
	let location = useLocation()

	return (
		<>
			<Tabs
				type="card"
				onChange={(key) => {
					history.push(`/${key}`)
				}}
				activeKey={location.pathname.replace('/', '')}
				animated
			>
				<TabPane tab="Ingestion History" key="ingestion-history" />
				<TabPane tab="Unmatched Hotels" key="unmatched-hotels" />
			</Tabs>
		</>
	)
}

export default Navigation

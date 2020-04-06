import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs } from 'antd'
const { TabPane } = Tabs

const Navigation = () => {
	let history = useHistory()
	return (
		<>
			<Tabs
				type="card"
				onChange={(key) => {
					history.push(`/${key}`)
				}}
			>
				<TabPane tab="Ingestion History" key="ingestion-history" />
				<TabPane tab="Unmatched Hotels" key="unmatched-hotels" />
			</Tabs>
		</>
	)
}

export default Navigation

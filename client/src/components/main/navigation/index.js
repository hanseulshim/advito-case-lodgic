import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Tabs } from 'antd'
const { TabPane } = Tabs

const Navigation = () => {
	let history = useHistory()
	let location = useLocation()

	const onEdit = (targetKey, action) => {
		if (targetKey === 'work-record' && action === 'remove') {
			history.push('/unmatched-hotels')
		}
	}

	return (
		<>
			<Tabs
				type="editable-card"
				onChange={(key) => {
					history.push(`/${key}`)
				}}
				activeKey={location.pathname.split('/')[1]}
				onEdit={onEdit}
				hideAdd
				animated
			>
				<TabPane
					tab="Ingestion History"
					key="ingestion-history"
					closable={false}
				/>
				<TabPane
					tab="Unmatched Hotels"
					key="unmatched-hotels"
					closable={false}
				/>
				{location.pathname.includes('work-record') && (
					<TabPane tab="Work Record" key="work-record" />
				)}
			</Tabs>
		</>
	)
}

export default Navigation

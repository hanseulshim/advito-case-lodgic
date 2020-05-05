import React from 'react'
import history from '../../../history'
import { Button } from 'antd'

export const getActions = (record) => {
	return (
		<Button onClick={() => history.push(`/work-record/${record.id}`)}>
			Work Record
		</Button>
	)
}

import React from 'react'
import history from '../../../history'
import { Button } from 'antd'

export const getActions = (record, pageNumber, index) => {
	const recordNumber = (pageNumber - 1) * 25 + index + 1
	return (
		<Button
			onClick={() => history.push(`/work-record/${record.id}-${recordNumber}`)}
		>
			Work Record
		</Button>
	)
}

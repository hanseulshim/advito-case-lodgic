import React from 'react'
import { useParams } from 'react-router-dom'
import RecordHeader from './RecordHeader'

const WorkRecord = () => {
	const { recordId } = useParams()
	return (
		<>
			<RecordHeader recordId={+recordId} />
		</>
	)
}

export default WorkRecord

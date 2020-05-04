import React from 'react'
import { useParams } from 'react-router-dom'
import RecordHeader from './RecordHeader'
import MatchesTable from './MatchesTable'

const WorkRecord = () => {
	const { recordId } = useParams()

	return (
		<>
			<RecordHeader recordId={+recordId} />
			<MatchesTable recordId={+recordId} />
		</>
	)
}

export default WorkRecord

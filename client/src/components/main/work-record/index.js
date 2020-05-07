import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RecordHeader from './RecordHeader'
import MatchesTable from './MatchesTable'
import MoreMatches from './MoreMatches'

const WorkRecord = () => {
	const { recordId } = useParams()
	const [matchedHotel, setMatchedHotel] = useState(null)

	const onMatchHotel = (record) => {
		if (record === matchedHotel) {
			setMatchedHotel(null)
		} else setMatchedHotel(record)
	}

	return (
		<>
			<RecordHeader recordId={+recordId} />
			<MatchesTable
				recordId={+recordId}
				onMatchHotel={onMatchHotel}
				matchedHotel={matchedHotel}
			/>
			<MoreMatches />
		</>
	)
}

export default WorkRecord

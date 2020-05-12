import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecordHeader from './RecordHeader'
import MatchesTable from './MatchesTable'
import MoreMatches from './MoreMatches'

const WorkRecord = () => {
	const { record } = useParams()
	const recordId = record.split('-')[0]
	const recordIndex = record.split('-')[1]
	const [matchedHotel, setMatchedHotel] = useState(null)

	useEffect(() => {
		//Reset matched hotel if user goes to a new record
		setMatchedHotel(null)
	}, [record])

	const onMatchHotel = (record) => {
		if (record === matchedHotel) {
			setMatchedHotel(null)
		} else setMatchedHotel(record)
	}

	return (
		<>
			<RecordHeader recordId={+recordId} recordIndex={+recordIndex} />
			<MatchesTable
				recordId={+recordId}
				onMatchHotel={onMatchHotel}
				matchedHotel={matchedHotel}
				style={{ marginBottom: '1em' }}
			/>
			<MoreMatches onMatchHotel={onMatchHotel} matchedHotel={matchedHotel} />
		</>
	)
}

export default WorkRecord

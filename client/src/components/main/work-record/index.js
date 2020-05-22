import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecordHeader from './RecordHeader'
import MatchesTable from './MatchesTable'
import MoreMatches from './MoreMatches'
import { useMutation } from '@apollo/client'
import { MATCH_HOTEL } from 'api/mutations'

const WorkRecord = () => {
	const { record } = useParams()
	const recordId = record.split('-')[0]
	const recordIndex = record.split('-')[1]
	const [matchedHotel, setHotel] = useState(null)

	const [matchHotel, { loading, error, data }] = useMutation(MATCH_HOTEL, {
		onCompleted: () => {
			console.log('done')
		},
	})

	useEffect(() => {
		//Reset matched hotel if user goes to a new record
		setHotel(null)
	}, [record])

	const setMatchedHotel = (record) => {
		if (record === matchedHotel) {
			setMatchedHotel(null)
		} else setMatchedHotel(record)
	}

	const onMatchHotel = () => {
		matchHotel({
			variables: {
				stageActivityHotelId: recordId,
				hotelPropertyId: matchedHotel,
			},
		})
	}

	return (
		<>
			<RecordHeader recordId={+recordId} recordIndex={+recordIndex} />
			<MatchesTable
				recordId={+recordId}
				setMatchedHotel={setMatchedHotel}
				matchedHotel={matchedHotel}
				onMatchHotel={onMatchHotel}
				style={{ marginBottom: '1em' }}
			/>
			<MoreMatches
				setMatchedHotel={setMatchedHotel}
				matchedHotel={matchedHotel}
				onMatchHotel={onMatchHotel}
			/>
		</>
	)
}

export default WorkRecord

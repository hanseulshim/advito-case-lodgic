import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import RecordHeader from './RecordHeader'
import MatchesTable from './MatchesTable'
import MoreMatches from './MoreMatches'
import { useMutation } from '@apollo/client'
import { MATCH_HOTEL } from 'api/mutations'
import { useHistory } from 'react-router-dom'

const WorkRecord = () => {
	let history = useHistory()
	const { record } = useParams()
	const recordId = record.split('-')[0]
	const recordIndex = record.split('-')[1]
	const [matchedHotel, setHotel] = useState(null)
	const [nextRecord, setNextRecord] = useState(null)

	const [matchHotel] = useMutation(MATCH_HOTEL, {
		onCompleted: () => {
			showSuccess()
		},
		onError: (error) => showError(error)
	})

	useEffect(() => {
		//Reset matched hotel if user goes to a new record
		setHotel(null)
		setNextRecord(null)
	}, [record])

	const setMatchedHotel = (record) => {
		if (record === matchedHotel) {
			setHotel(null)
		} else setHotel(record)
	}

	const onMatchHotel = () => {
		matchHotel({
			variables: {
				stageActivityHotelId: +recordId,
				hotelPropertyId: +matchedHotel
			}
		})
	}

	const showSuccess = () => {
		message.success(
			'Successfully matched hotel! Redirecting you to the next record...',
			5,
			closeSuccess
		)
	}

	const showError = (error) => {
		message.error('There was an error trying match the hotel. Error: ' + error)
	}

	const closeSuccess = () => {
		if (nextRecord) {
			history.push(`/work-record/${nextRecord}-${+recordIndex + 1}`)
		} else
			message.success(
				'No more records to work. Redirecting you ingestion history...',
				5,
				history.push(`/ingestion-history`)
			)
	}

	return (
		<>
			<RecordHeader
				recordId={+recordId}
				recordIndex={+recordIndex}
				setNext={setNextRecord}
			/>
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

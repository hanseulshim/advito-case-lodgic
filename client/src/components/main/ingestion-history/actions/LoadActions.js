import React from 'react'
import { Checkbox } from 'antd'

const LoadActions = ({ record, selectedRecords, setSelectedRecords }) => {
	const onChange = (type) => {
		//Check if record is already selected
		const index = selectedRecords.findIndex(
			(selected) => selected.jobIngestionId === record.jobIngestionId
		)

		//If record is not selected, add it to selectedRecords
		if (index === -1) {
			setSelectedRecords([
				...selectedRecords,
				{ type, jobIngestionId: record.jobIngestionId, jobName: record.jobName }
			])
		}
		// If record is selected but it has a different type, change the type
		else if (index !== -1 && selectedRecords[index].type !== type) {
			const filtered = selectedRecords.filter(
				(selectedRecord) =>
					selectedRecord.jobIngestionId !== record.jobIngestionId
			)
			const updated = {
				...selectedRecords[index],
				type
			}
			setSelectedRecords([{ ...updated }, ...filtered])
		}
		// If record is already there with same type, remove it
		else {
			const filtered = selectedRecords.filter(
				(selectedRecord) =>
					selectedRecord.jobIngestionId !== record.jobIngestionId
			)
			setSelectedRecords([...filtered])
		}
	}

	const { isDpm, statusDpm, isSourcing, statusSourcing } = record
	const loading =
		(statusDpm && statusDpm.toLowerCase() === 'loaded') ||
		(statusSourcing && statusSourcing.toLowerCase() === 'loaded')
	const showDpm =
		!isDpm &&
		isSourcing &&
		statusSourcing.toLowerCase() === 'approved' &&
		!loading

	const showSourcing =
		!isSourcing && isDpm && statusDpm.toLowerCase() === 'approved' && !loading

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Checkbox
				onChange={() => onChange('DPM')}
				style={{
					visibility: showDpm ? '' : 'hidden'
				}}
				checked={selectedRecords.some(
					(selectedRecord) =>
						selectedRecord.jobIngestionId === record.jobIngestionId &&
						selectedRecord.type === 'DPM'
				)}
			>
				DPM
			</Checkbox>
			<Checkbox
				onChange={() => onChange('Sourcing')}
				style={{
					visibility: showSourcing ? '' : 'hidden'
				}}
				checked={selectedRecords.some(
					(selectedRecord) =>
						selectedRecord.jobIngestionId === record.jobIngestionId &&
						selectedRecord.type === 'Sourcing'
				)}
			>
				Sourcing
			</Checkbox>
		</div>
	)
}

export default LoadActions

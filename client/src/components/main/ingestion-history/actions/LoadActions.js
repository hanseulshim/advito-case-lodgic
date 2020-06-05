import React from 'react'
import { Checkbox } from 'antd'

const LoadActions = ({ record, selectedRecords, setSelectedRecords }) => {
	const onChange = (type) => {
		const index = selectedRecords.findIndex(
			(selected) => selected.jobIngestionId === record.jobIngestionId
		)
		if (index === -1) {
			setSelectedRecords([
				...selectedRecords,
				{ type, jobIngestionId: record.jobIngestionId, jobName: record.jobName }
			])
		} else if (index !== -1 && selectedRecords[index].type !== type) {
			const filtered = selectedRecords.filter(
				(selectedRecord) =>
					selectedRecord.jobIngestionId !== record.jobIngestionId
			)
			const updated = {
				...selectedRecords[index],
				type
			}
			setSelectedRecords([{ ...updated }, ...filtered])
		} else {
			const filtered = selectedRecords.filter(
				(selectedRecord) =>
					selectedRecord.jobIngestionId !== record.jobIngestionId
			)
			setSelectedRecords([...filtered])
		}
	}

	const { isDpm, statusDpm, isSourcing, statusSourcing } = record
	const displayArr = []
	if (
		!isDpm ||
		(!isDpm && isSourcing && statusSourcing.toLowerCase() === 'approved')
	) {
		displayArr.push(
			<Checkbox
				onChange={() => onChange('DPM')}
				checked={selectedRecords.some(
					(selectedRecord) =>
						selectedRecord.jobIngestionId === record.jobIngestionId &&
						selectedRecord.type === 'DPM'
				)}
			>
				DPM
			</Checkbox>
		)
	}
	if (
		!isSourcing ||
		(!isSourcing && isDpm && statusDpm.toLowerCase() === 'approved')
	) {
		displayArr.push(
			<Checkbox
				onChange={() => onChange('Sourcing')}
				checked={selectedRecords.some(
					(selectedRecord) =>
						selectedRecord.jobIngestionId === record.jobIngestionId &&
						selectedRecord.type === 'Sourcing'
				)}
			>
				Sourcing
			</Checkbox>
		)
	}

	return displayArr.length ? displayArr.map((el, i) => ({ ...el, key: i })) : []
}

export default LoadActions

import React from 'react'
import { Checkbox } from 'antd'

const LoadActions = ({ record, selectedRecords, setSelectedRecords }) => {
	const onChange = (type) => {
		const index = selectedRecords.findIndex(
			(selected) => selected.id === record.id
		)
		if (index === -1) {
			setSelectedRecords([
				...selectedRecords,
				{ type, id: record.id, name: record.jobName }
			])
		} else if (index !== -1 && selectedRecords[index].type !== type) {
			const filtered = selectedRecords.filter(
				(selectedRecord) => selectedRecord.id !== record.id
			)
			const updated = {
				...selectedRecords[index],
				type
			}
			setSelectedRecords([{ ...updated }, ...filtered])
		} else {
			const filtered = selectedRecords.filter(
				(selectedRecord) => selectedRecord.id !== record.id
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
						selectedRecord.id === record.id && selectedRecord.type === 'DPM'
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
						selectedRecord.id === record.id &&
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

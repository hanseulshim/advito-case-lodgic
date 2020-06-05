import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { useMutation } from '@apollo/client'
import { LOAD_ENHANCED_QC_REPORT } from 'api'
import { Button, Modal, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Option } = Select

const Icon = styled(ExclamationCircleOutlined)`
	color: ${(props) => props.theme.treePoppy};
	margin-right: 1em;
	height: 10px;
`

const LoadEnhancedQc = ({ selectedRecords, setSelectedRecords }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName } = state
	const [loadQc, { loading }] = useMutation(LOAD_ENHANCED_QC_REPORT, {
		onCompleted: () => {
			setSelectedRecords([])
			setVisible(false)
		}
	})
	const [visible, setVisible] = useState(false)
	const [year, setYear] = useState(null)
	const [month, setMonth] = useState(null)
	const type = selectedRecords.length > 0 ? selectedRecords[0].type : null

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onOk = async () => {
		const jobIngestionIds = selectedRecords.map((record) => record.id)
		try {
			await loadQc({
				variables: { jobIngestionIds, type, year, month }
			})
		} catch (e) {
			error(e.message)
			console.error('Error in backout ', e)
		}
	}

	const error = (error) => {
		Modal.error({
			title: 'Error in Loading',
			content: error
		})
	}

	const handleYearChange = (year) => setYear(year)

	const getYears = () => {
		const current = new Date().getFullYear()
		return [
			current - 5,
			current - 4,
			current - 3,
			current - 2,
			current - 1,
			current,
			current + 1
		]
	}

	const handleMonthChange = (month) => setMonth(month)

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	return (
		<>
			<Button
				disabled={!selectedRecords.length}
				style={{
					display: 'block',
					width: '220px',
					marginLeft: 'auto',
					marginTop: '1em'
				}}
				onClick={toggleModal}
			>
				Load for Enhanced QC Report
			</Button>
			<Modal
				visible={visible}
				title={
					<>
						<Icon />
						Load for Enhanced QC Report
					</>
				}
				onOk={onOk}
				onCancel={toggleModal}
			>
				<>
					<p>
						You are about to load {type} data for {clientName}, confirming the
						activity data has been tested and approved by consultants.
					</p>
					<h3>NOT REVERSIBLE</h3>
					<p> The following files will be processed:</p>
					<ul>
						{selectedRecords.map((record, i) => {
							return <li key={'record' + i}> {record.jobName}</li>
						})}
					</ul>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Select
							onChange={handleYearChange}
							style={{ width: 225 }}
							placeholder={'Select year'}
							confirmLoading={loading}
						>
							{getYears().map((year, i) => {
								return (
									<Option key={'year' + i} value={parseInt(year)}>
										{year}
									</Option>
								)
							})}
						</Select>

						{type === 'DPM' && (
							<Select
								onChange={handleMonthChange}
								style={{ width: 225 }}
								placeholder={'Select month'}
							>
								{months.map((month, i) => {
									return (
										<Option key={'month' + i} value={parseInt(month)}>
											{month}
										</Option>
									)
								})}
							</Select>
						)}
					</div>
				</>
			</Modal>
		</>
	)
}

export default LoadEnhancedQc

import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { useMutation } from '@apollo/client'
import { LOAD_ENHANCED_QC_REPORT } from 'api'
import { Button, Modal, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { months, getYears } from '../helper'

const { Option } = Select

const Icon = styled(ExclamationCircleOutlined)`
	color: ${(props) => props.theme.treePoppy};
	margin-right: 1em;
	height: 10px;
`

const LoadEnhancedQc = ({ selectedRecords, checkLoadStatus, setPolling }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName } = state
	const [visible, setVisible] = useState(false)
	const [year, setYear] = useState(null)
	const [month, setMonth] = useState(null)
	const jobIngestionIds = selectedRecords.map((record) => record.jobIngestionId)
	const type = selectedRecords.length
		? selectedRecords[0].type.toLowerCase()
		: null

	const [loadQc, { loading }] = useMutation(LOAD_ENHANCED_QC_REPORT, {
		onCompleted: () => {
			console.log('initial poll')
			setVisible(false)
			checkLoadStatus()
			setPolling(1)
		}
	})

	const toggleModal = () => {
		setVisible(!visible)
		clearInputs()
	}

	const showError = (error) => {
		Modal.error({
			title: 'Error in Loading',
			content: error
		})
	}

	const clearInputs = () => {
		setYear(null)
		setMonth(null)
	}

	const onOk = async () => {
		const equalTypes = selectedRecords.every(
			(obj) => obj.type === selectedRecords[0].type
		)
		if (!equalTypes) {
			showError(
				'You must select files for DPM or Sourcing. You cannot complete the Load action for both at the same time'
			)
			toggleModal()
		} else {
			try {
				await loadQc({
					variables: { jobIngestionIds, type, year, month }
				})
			} catch (e) {
				showError(e.message)
			}
		}
	}

	return (
		<>
			<Button
				disabled={!selectedRecords.length}
				style={{
					display: 'block',
					width: '220px',
					marginLeft: 'auto',
					position: 'relative',
					bottom: '3.5em'
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
				confirmLoading={loading}
				okButtonProps={{ disabled: !year || (type === 'dpm' && !month) }}
			>
				<>
					<p>
						You are about to load {type === 'dpm' ? 'DPM' : 'Sourcing'} data for{' '}
						{clientName}, confirming the activity data has been tested and
						approved by consultants.
					</p>
					<h3>NOT REVERSIBLE</h3>
					<p> The following files will be processed:</p>
					<ul>
						{selectedRecords.map((record, i) => {
							return <li key={'record' + i}> {record.jobName}</li>
						})}
					</ul>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{type === 'dpm' && (
							<Select
								onChange={(month) => setMonth(month)}
								style={{ width: 225 }}
								placeholder={'Select month'}
								value={month}
							>
								{months.map((month, i) => {
									return (
										<Option key={'month' + i} value={month.value}>
											{month.label}
										</Option>
									)
								})}
							</Select>
						)}
						<Select
							onChange={(year) => setYear(year)}
							style={{ width: 225 }}
							placeholder={'Select year'}
							value={year}
						>
							{getYears()
								.reverse()
								.map((year, i) => {
									return (
										<Option key={'year' + i} value={parseInt(year)}>
											{year}
										</Option>
									)
								})}
						</Select>
					</div>
				</>
			</Modal>
		</>
	)
}

export default LoadEnhancedQc

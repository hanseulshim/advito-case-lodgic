import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Icon = styled(ExclamationCircleOutlined)`
	color: ${(props) => props.theme.treePoppy};
	margin-right: 1em;
	height: 10px;
`

const LoadEnhancedQc = ({ selectedRecords, setSelectedRecords }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName } = state
	const [visible, setVisible] = useState(false)
	// const [year, setYear] = useState('')
	// const [month, setMonth] = useState('')
	const type = selectedRecords.length > 0 ? selectedRecords[0].type : null

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onOk = () => console.log('fired!')

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
				</>
			</Modal>
		</>
	)
}

export default LoadEnhancedQc

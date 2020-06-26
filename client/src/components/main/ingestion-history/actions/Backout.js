import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { Button, Modal } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { BACKOUT, CHECK_BACKOUT } from 'api'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { SpinLoader } from 'components/common/Loader'

const Icon = styled(ExclamationCircleOutlined)`
	color: ${(props) => props.theme.treePoppy};
	margin-right: 1em;
	height: 10px;
`

//DUMB COMPONENT TO RENDER WHILE POLLING
const BackoutPolling = ({
	jobIngestionId,
	setPollingBackout,
	refetch,
	showSuccess
}) => {
	const { data } = useQuery(CHECK_BACKOUT, {
		variables: { jobIngestionId },
		pollInterval: 3000
	})

	if (data && data.checkBackout) {
		setPollingBackout(false)
		showSuccess()
		refetch()
	}
	return (
		<Modal
			visible={true}
			footer={null}
			closable={false}
			title={'Backing out files....'}
		>
			<SpinLoader />
		</Modal>
	)
}

const Backout = ({ record, refetch }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName } = state
	const [isPollingBackout, setPollingBackout] = useState(false)
	const [backout, { loading }] = useMutation(BACKOUT, {
		onCompleted: () => {
			setVisible(false)
			setPollingBackout(true)
		},
		onError: (e) => {
			error(e.message)
		}
	})
	const [visible, setVisible] = useState(false)

	const {
		isDpm,
		statusDpm,
		isSourcing,
		statusSourcing,
		jobName,
		jobIngestionId
	} = record
	const showBackout = statusDpm !== 'Approved' && statusSourcing !== 'Approved'
	const loaded = statusDpm === 'Loaded' || statusSourcing === 'Loaded'
	const open = !isDpm && !isSourcing

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onOk = async (jobIngestionId) => {
		try {
			await backout({
				variables: { jobIngestionId }
			})
		} catch (e) {
			error(e.message)
			console.error('Error in backout ', e)
		}
	}

	const showSuccess = () => {
		Modal.success({
			title: 'Success',
			content: 'File(s) successfully backed out',
			okText: 'Close',
			onOk: toggleModal()
		})
	}

	const error = (error) => {
		Modal.error({
			title: 'Error in Backout',
			content: error
		})
	}

	return (
		<>
			<Button onClick={toggleModal} disabled={!showBackout}>
				Backout
			</Button>
			<Modal
				visible={visible}
				title={
					<>
						<Icon />
						Backout
					</>
				}
				onOk={() => onOk(jobIngestionId)}
				onCancel={toggleModal}
				confirmLoading={loading}
			>
				<div>
					<>
						<h3>WARNING</h3>
						{loaded && (
							<>
								<p>
									You are about to backout a file for {clientName}, which has
									already been loaded. Continuing this action will:
								</p>
								<ul>
									<li> Delete all ingested records for this file.</li>
									<li> Delete all unmatched properties for this file.</li>
									<li>
										Delete all processed records for ALL other files associated
										with this file. The ingested records for all other files
										will remain.
									</li>
								</ul>
							</>
						)}
						{open && (
							<>
								<p>
									You are about to backout of the file below for {clientName},
									which will delete all ingested data from this file and delete
									any associated unmatched property records.
								</p>
							</>
						)}
						<h3>NOT REVERSIBLE</h3>
						<p>The following file will be backed out:</p>
						<p>{jobName}</p>
					</>
				</div>
			</Modal>
			{isPollingBackout && (
				<BackoutPolling
					jobIngestionId={jobIngestionId}
					setPollingBackout={setPollingBackout}
					refetch={refetch}
					showSuccess={showSuccess}
				/>
			)}
		</>
	)
}

export default Backout

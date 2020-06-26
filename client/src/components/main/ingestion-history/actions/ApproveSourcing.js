import React, { useState, useContext, useEffect } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { APPROVE_FILE_LIST, APPROVE_FILES, CHECK_APPROVE_FILES } from 'api'
import { store } from 'context/store'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2em;
`

const Icon = styled(ExclamationCircleOutlined)`
	color: ${(props) => props.theme.treePoppy};
	margin-right: 1em;
	height: 10px;
`

// DUMB COMPONENT TO RENDER WHILE POLLING
const ApproveFileListPolling = ({
	variables,
	setPolling,
	refetch,
	showSuccess
}) => {
	const { data } = useQuery(CHECK_APPROVE_FILES, {
		variables: { ...variables },
		pollInterval: 3000
	})

	if (data && data.checkApproveFiles) {
		setPolling(false)
		showSuccess()
		refetch()
	}
	return (
		<Modal
			visible={true}
			footer={null}
			closable={false}
			title={'Approving files...'}
		>
			<SpinLoader />
		</Modal>
	)
}

const ApproveSourcing = ({ refetchIngestionHistory, ingestionHotelList }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName, clientId, dateRange } = state
	const [visible, setVisible] = useState(false)
	const [polling, setPolling] = useState(false)
	const [loadFiles, { loading, error, data }] = useLazyQuery(
		APPROVE_FILE_LIST,
		{
			variables: {
				clientId,
				startDate: dateRange[0],
				endDate: dateRange[1],
				type: 'sourcing'
			},
			fetchPolicy: 'network-only'
		}
	)

	const [approveFiles, { loading: loadingMutation }] = useMutation(
		APPROVE_FILES,
		{
			onCompleted: () => {
				setPolling(true)
				toggleModal()
			},
			onError: (e) => {
				showError(e.message)
			}
		}
	)

	useEffect(() => {
		loadFiles()
	}, [ingestionHotelList])

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onOk = async () => {
		try {
			await approveFiles({
				variables: {
					clientId,
					startDate: dateRange[0],
					endDate: dateRange[1],
					type: 'sourcing'
				}
			})
		} catch (e) {
			showError(e.message)
			console.error('Error in backout ', e)
		}
	}

	const showSuccess = () => {
		Modal.success({
			title: 'Success',
			content: 'File(s) successfully approved',
			okText: 'Close'
		})
	}

	const showError = (error) => {
		Modal.error({
			title: 'Error',
			content: error
		})
	}

	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal} danger>
				Approve files for Sourcing {data && `(${data.approveFileList.length})`}
			</Button>
			<Modal
				visible={visible}
				title={
					<>
						<Icon />
						Approve files for Sourcing
					</>
				}
				onOk={onOk}
				onCancel={toggleModal}
				confirmLoading={loadingMutation}
				okButtonProps={{
					disabled: !data || data.approveFileList.length < 1
				}}
			>
				{loading && <SpinLoader />}
				{error && <ErrorMessage error={error} />}
				{data &&
					(data.approveFileList.length > 0 ? (
						<>
							<Header>
								<p>
									You are about to approve Sourcing data for {clientName},
									confirming that enhanced QC report has been approved by
									consultant. This action is not reversible.
								</p>
							</Header>
							<h3>NOT REVERSIBLE</h3>
							<div style={{ maxHeight: '300px', overflow: 'scroll' }}>
								<ul>
									{data.approveFileList.map((file, i) => {
										return <li key={'file' + i}>{file}</li>
									})}
								</ul>
							</div>
						</>
					) : (
						<p>No files available for approving</p>
					))}
			</Modal>
			{polling && (
				<ApproveFileListPolling
					variables={{
						clientId,
						startDate: dateRange[0],
						endDate: dateRange[1],
						type: 'sourcing'
					}}
					setPolling={setPolling}
					refetch={refetchIngestionHistory}
					showSuccess={showSuccess}
				/>
			)}
		</>
	)
}

export default ApproveSourcing

import React, { useState, useContext } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { APPROVE_FILE_LIST } from 'api'
import { APPROVE_FILES } from 'api'
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

const ApproveSourcing = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName, clientId, dateRange } = state
	const [visible, setVisible] = useState(false)
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
				showSuccess()
			}
		}
	)

	const loadFileList = () => {
		loadFiles()
		toggleModal()
	}

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
			content: 'Files successfully approved',
			okText: 'Close',
			onOk: toggleModal()
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
			<Button icon={<DownloadOutlined />} onClick={loadFileList} danger>
				Approve files for Sourcing
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
		</>
	)
}

export default ApproveSourcing

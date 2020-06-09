import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import { APPROVE_FILE_LIST } from 'api/queries'
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

const ApproveDPM = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientName, clientId, dateRange } = state
	const [visible, setVisible] = useState(false)

	const { loading, error, data } = useQuery(APPROVE_FILE_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			type: 'dpm'
		}
	})
	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onOk = () => {
		toggleModal()
	}

	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal} danger>
				Approve files for DPM
			</Button>
			<Modal
				visible={visible}
				title={
					<>
						<Icon />
						Approve files for DPM
					</>
				}
				onOk={onOk}
				onCancel={toggleModal}
			>
				{data.approveFileList.length > 0 ? (
					<>
						<Header>
							<p>
								You are about to approve DPM data for {clientName}, confirming
								that enhanced QC report has been approved by consultant. This
								action is not reversible.
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
					<p>No files available to approve.</p>
				)}
			</Modal>
		</>
	)
}

export default ApproveDPM

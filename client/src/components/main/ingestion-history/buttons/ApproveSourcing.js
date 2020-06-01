import React, { useState } from 'react'
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

const ApproveSourcing = ({ onClick }) => {
	const [visible, setVisible] = useState(false)

	const toggleModal = () => {
		setVisible(!visible)
	}

	const onOk = () => {
		onClick()
		toggleModal()
	}

	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal} danger>
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
			>
				<Header>
					<p>
						You are about to approve sourcing data for 'client name', confirming
						that enhanced QC report has been approved by consultant. This action
						is not reversible.
					</p>
				</Header>
			</Modal>
		</>
	)
}

export default ApproveSourcing

import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { useMutation } from '@apollo/client'
import { BACKOUT } from 'api'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Icon = styled(ExclamationCircleOutlined)`
	color: ${(props) => props.theme.treePoppy};
	margin-right: 1em;
	height: 10px;
`

export const Backout = ({ record, refetch }) => {
	const [backout, { loading }] = useMutation(BACKOUT, {
		onCompleted: () => refetch()
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
					{loaded && (
						<>
							<p>
								You are about to backout of file {jobName}, this is a
								nonreversible action. The following will occur:
							</p>
							<p>
								{' '}
								- All Records for this file will be deleted and removed from
								ingestion history and unmatched screens
							</p>
							<p>
								- Loaded records for all other files that were included in the
								same data load will be deleted (but not the ingested data for
								all other associated files)
							</p>
						</>
					)}
					{open && (
						<p>
							Messaging: you are about to backout of file {jobName}, this is a
							nonreversible action. The following will occur...
						</p>
					)}
				</div>
			</Modal>
		</>
	)
}

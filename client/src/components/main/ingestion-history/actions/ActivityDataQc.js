import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { EXPORT_ACTIVITY_DATA_QC } from 'api'
import { Button, Modal, Radio } from 'antd'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const StyledRadio = styled(Radio)`
	display: block;
	margin-bottom: 5px;
`

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

const ActivityDataQc = () => {
	const [visible, setVisible] = useState(false)
	const [currencyType, setCurrencyType] = useState('')
	const [exportQC, { loading }] = useMutation(EXPORT_ACTIVITY_DATA_QC, {
		onCompleted: () => {
			parseCSV('yup')
			setVisible(false)
		}
	})

	const toggleModal = () => {
		setVisible(!visible)
	}
	const handleCurrencyType = (e) => {
		setCurrencyType(e.target.value)
	}

	const onOk = async () => {
		try {
			await exportQC({
				variables: { currencyType }
			})
		} catch (e) {
			error(e.message)
			console.error('Error in backout ', e)
		}
	}

	const error = (error) => {
		Modal.error({
			title: 'Error in Export',
			content: error
		})
	}

	const parseCSV = (flatFile) => {
		console.log('Got the file: ', flatFile)
	}

	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal}>
				Activity Data QC Export
			</Button>
			<Modal
				visible={visible}
				title={'Activity Data QC Export'}
				onOk={onOk}
				onCancel={toggleModal}
				confirmLoading={loading}
				okButtonProps={{ disabled: !currencyType ? true : false }}
			>
				<Header>
					<Icon />
					<span>Select a currency for your Activity Data QC Export</span>
				</Header>
				<Radio.Group value={currencyType} onChange={handleCurrencyType}>
					<StyledRadio value={'ingested'}>Ingested Currency</StyledRadio>
					<StyledRadio value={'usd'}>USD Currency</StyledRadio>
				</Radio.Group>
			</Modal>
		</>
	)
}

export default ActivityDataQc

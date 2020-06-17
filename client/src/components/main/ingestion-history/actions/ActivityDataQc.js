import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { EXPORT_ACTIVITY_DATA_QC } from 'api'
import { Button, Modal, Radio } from 'antd'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { exportCsv } from '../helper'
import moment from 'moment'

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
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange, clientName } = state
	const [visible, setVisible] = useState(false)
	const [currencyType, setCurrencyType] = useState('')
	const [exportQC, { loading }] = useMutation(EXPORT_ACTIVITY_DATA_QC, {
		onCompleted: ({ exportActivityDataQc }) => {
			getCsv(exportActivityDataQc)
			setVisible(false)
			setCurrencyType('')
		}
	})

	const toggleModal = () => {
		setVisible(!visible)
		setCurrencyType('')
	}
	const handleCurrencyType = (e) => {
		setCurrencyType(e.target.value)
	}

	const onOk = async () => {
		try {
			await exportQC({
				variables: {
					currencyType,
					clientId,
					dataStartDate: dateRange[0],
					dataEndDate: dateRange[1]
				}
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

	const getCsv = (flatFile) => {
		const formattedDate = moment(new Date()).format('YYYY_MM_DD')
		try {
			exportCsv(flatFile, `${clientName}_ActivityDataQc_${formattedDate}`)
		} catch (e) {
			error(e.message)
			console.error(e)
		}
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

import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import { useQuery, useMutation } from '@apollo/client'
import { CURRENCY_LIST } from 'api'
import { EXPORT_ENHANCED_QC, CHECK_EXPORT_ENHANCED_QC } from 'api'
import { SpinLoader } from 'components/common/Loader'
import styled from 'styled-components'
import ErrorMessage from 'components/common/ErrorMessage'
import { Button, Modal, Radio, Select } from 'antd'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { exportCsv } from '../helper'
import moment from 'moment'

const { Option } = Select

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

// DUMB COMPONENT TO RENDER WHILE POLLING
const ExportPolling = ({
	variables,
	setPolling,
	getCsv,
	showSuccess,
	showError
}) => {
	const { data, error } = useQuery(CHECK_EXPORT_ENHANCED_QC, {
		variables: { ...variables },
		pollInterval: 3000,
		fetchPolicy: 'network-only'
	})

	if (data && data.checkExportEnhancedQC) {
		setPolling(false)
		showSuccess()
		getCsv(data.checkExportEnhancedQC)
		return null
	}
	if (data && data.checkExportEnhancedQC === '') {
		setPolling(false)
		showError('No enhanced QC data is available for exporting.')
	}
	if (error) {
		setPolling(false)
		showError(error.message)
		return null
	}
	return (
		<Modal
			visible={true}
			footer={null}
			closable={false}
			title={'Checking for Enhanced QC Export...'}
		>
			<SpinLoader />
		</Modal>
	)
}

const EnhancedQc = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange, clientName } = state
	const [visible, setVisible] = useState(false)
	const [polling, setPolling] = useState(false)
	const [currencyType, setCurrencyType] = useState('ingested')
	const [currencySelection, setCurrencySelection] = useState('')
	const { error, data } = useQuery(CURRENCY_LIST)
	const [exportQC, { loading }] = useMutation(EXPORT_ENHANCED_QC, {
		onCompleted: () => {
			setPolling(true)
			setVisible(false)
			setCurrencyType('ingested')
			setCurrencySelection('')
		}
	})

	const toggleModal = () => {
		setVisible(!visible)
		setCurrencyType('ingested')
		setCurrencySelection('')
	}
	const handleCurrencyType = (e) => {
		setCurrencyType(e.target.value)
	}
	const handleCurrencySelection = (e) => {
		setCurrencySelection(e)
	}

	const onOk = async () => {
		try {
			await exportQC({
				variables: {
					currencyType:
						currencyType === 'ingested' ? 'ingested' : currencySelection,
					clientId,
					dataStartDate: dateRange[0],
					dataEndDate: dateRange[1]
				}
			})
		} catch (e) {
			showError(e.message)
			console.error('Error in backout ', e)
		}
	}

	const showError = (error) => {
		Modal.error({
			title: 'Error in Export',
			content: error
		})
	}

	const showSuccess = () => {
		Modal.success({
			title: 'Success',
			content: 'Successfully exported for Enhanced Data QC',
			okText: 'Close'
		})
	}

	const getCsv = (flatFile) => {
		const formattedDate = moment(new Date()).format('YYYY_MM_DD')
		try {
			exportCsv(flatFile, `${clientName}_EnhancedQc_${formattedDate}`)
		} catch (e) {
			error(e.message)
			console.error(e)
		}
	}

	if (error) return <ErrorMessage error={error} />
	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal}>
				Enhanced QC Export
			</Button>
			<Modal
				visible={visible}
				title={'Enhanced QC Export'}
				onOk={onOk}
				onCancel={toggleModal}
				confirmLoading={loading}
				okButtonProps={{
					disabled:
						!currencyType || (currencyType === 'other' && !currencySelection)
				}}
			>
				<Header>
					<Icon />
					<span>Select a currency for your Enhanced QC Export:</span>
				</Header>
				<Radio.Group value={currencyType} onChange={handleCurrencyType}>
					<StyledRadio value={'ingested'}>Ingested Currency</StyledRadio>
					<div style={{ display: 'flex' }}>
						<StyledRadio value={'other'}>Other</StyledRadio>
						{currencyType === 'other' && (
							<Select
								showSearch
								placeholder="Select currency"
								onChange={handleCurrencySelection}
								filterOption={(input, option) =>
									option.children[2]
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
								optionFilterProp="children"
								value={currencySelection}
								style={{ width: 300 }}
							>
								{data.currencyList.map((currency, i) => {
									return (
										<Option key={'currency' + i} value={currency.currencyCode}>
											{currency.currencyName} - {currency.currencyCode}
										</Option>
									)
								})}
							</Select>
						)}
					</div>
				</Radio.Group>
			</Modal>
			{polling && (
				<ExportPolling
					variables={{
						dataStartDate: dateRange[0],
						dataEndDate: dateRange[1],
						clientId
					}}
					setPolling={setPolling}
					getCsv={getCsv}
					showSuccess={showSuccess}
					showError={showError}
				/>
			)}
		</>
	)
}

export default EnhancedQc

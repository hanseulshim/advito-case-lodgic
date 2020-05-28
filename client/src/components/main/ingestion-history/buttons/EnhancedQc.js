import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENCY_LIST } from 'api/queries'
import styled from 'styled-components'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { Button, Modal, Radio, Select } from 'antd'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

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

const EnhancedQc = () => {
	const [visible, setVisible] = useState(false)
	const [currencyType, setCurrencyType] = useState('')
	const [currencySelection, setCurrencySelection] = useState('')

	const { loading, error, data } = useQuery(CURRENCY_LIST)
	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const toggleModal = () => {
		setVisible(!visible)
	}
	const handleCurrencyType = (e) => {
		setCurrencyType(e.target.value)
	}

	const handleCurrencySelection = (e) => {
		setCurrencySelection(e)
	}

	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal}>
				Enhanced QC Export
			</Button>
			<Modal
				visible={visible}
				title={'Enhanced QC Export'}
				onOk={toggleModal}
				onCancel={toggleModal}
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
									option.props.children
										.toString()
										.toLowerCase()
										.indexOf(input.toLowerCase()) >= 0
								}
								optionFilterProp="children"
								value={currencySelection}
								style={{ width: 300 }}
							>
								{data.currencyList.map((currency, i) => {
									return (
										<Option key={'currency' + i} value={currency.id}>
											{currency.currencyName} - {currency.currencyCode}
										</Option>
									)
								})}
							</Select>
						)}
					</div>
				</Radio.Group>
			</Modal>
		</>
	)
}

export default EnhancedQc

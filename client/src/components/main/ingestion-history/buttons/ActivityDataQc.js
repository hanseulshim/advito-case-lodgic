import React, { useState } from 'react'
import styled from 'styled-components'
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

const ActivityDataQc = ({ onClick }) => {
	const [visible, setVisible] = useState(false)
	const [currencyType, setCurrencyType] = useState('')

	const toggleModal = () => {
		setVisible(!visible)
	}
	const handleCurrencyType = (e) => {
		setCurrencyType(e.target.value)
	}

	const onOk = () => {
		onClick(currencyType)
		toggleModal()
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

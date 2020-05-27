import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, Radio } from 'antd'
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const StyledRadio = styled(Radio)`
	display: block;
	margin-bottom: 5px;
`

const EnhancedQc = () => {
	const [visible, setVisible] = useState('')
	const [currencyType, setCurrencyType] = useState('')

	const toggleModal = () => {
		setVisible(!visible)
	}
	const handleCurrencyType = (e) => {
		setCurrencyType(e.target.value)
	}

	return (
		<>
			<Button icon={<DownloadOutlined />} onClick={toggleModal}>
				Export Enhanced QC Report
			</Button>
			<Modal visible={visible}>
				<p>Some contents</p>
				<Radio.Group value={currencyType} onChange={handleCurrencyType}>
					<StyledRadio value={1}>Option A</StyledRadio>
					<StyledRadio value={2}>Option B</StyledRadio>
				</Radio.Group>
			</Modal>
		</>
	)
}

export default EnhancedQc

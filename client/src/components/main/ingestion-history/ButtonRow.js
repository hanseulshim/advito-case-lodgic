import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import EnhancedQc from './buttons/EnhancedQc'
import ActivityDataQc from './buttons/ActivityDataQc'

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-left: auto;
	margin-bottom: 15px;

	> Button {
		margin-left: 10px;
	}
`

const ButtonRow = () => {
	return (
		<Container>
			<ActivityDataQc />
			<EnhancedQc />
			<Button danger>Approve Files for DPM</Button>
			<Button danger>Approve Files for Sourcing</Button>
		</Container>
	)
}

export default ButtonRow

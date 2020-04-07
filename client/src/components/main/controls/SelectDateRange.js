import React from 'react'
import styled from 'styled-components'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;

	label {
		margin-right: 10px;
		text-transform: uppercase;
		font-size: 0.75em;
	}
`

const SelectDateRange = ({ onChange }) => {
	const dateFormat = 'YYYY/MM/DD'
	return (
		<Container>
			<label>Select Date Range</label>
			<RangePicker onChange={onChange} format={dateFormat} />
		</Container>
	)
}

export default SelectDateRange

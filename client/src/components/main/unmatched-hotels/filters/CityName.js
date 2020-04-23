import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

const SelectContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;

	label {
		margin-right: 10px;
		text-transform: uppercase;
		font-size: 0.75em;
	}
`

const CityName = ({ onChange, value }) => {
	return (
		<SelectContainer>
			<label>City Name</label>
			<Input
				placeholder="Enter City Name"
				onChange={(e) => onChange(e.target.value, 'cityName')}
				value={value}
			/>
		</SelectContainer>
	)
}

export default CityName

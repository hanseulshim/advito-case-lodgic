import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
const { Option } = Select

const Container = styled.div`
	display: flex;
`

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

const SortType = ({ onChange, value }) => {
	return (
		<Container>
			<SelectContainer>
				<label>Select Sorting</label>
				<Select
					placeholder="Sorting"
					onChange={(e) => onChange(e, 'sortType')}
					value={value}
					defaultValue={''}
				>
					<Option key={'convertedRoomSpend'} value={''}>
						{'Converted Room Spend (Desc)'}
					</Option>
					<Option key={'bestMatchScoreAsc'} value={'matchAsc'}>
						{'Match % asc'}
					</Option>
					<Option key={'bestMatchScoreDesc'} value={'matchDesc'}>
						{'Match % desc'}
					</Option>
				</Select>
			</SelectContainer>
		</Container>
	)
}

export default SortType

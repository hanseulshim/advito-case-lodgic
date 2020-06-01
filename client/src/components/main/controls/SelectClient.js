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
	width: 300px;

	label {
		margin-right: 10px;
		text-transform: uppercase;
		font-size: 0.75em;
	}
`

const SelectClient = ({ onChange, clients }) => {
	return (
		<Container>
			<SelectContainer>
				<label>Select Client</label>
				<Select
					showSearch
					placeholder="Select a client"
					onChange={onChange}
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0
					}
					optionFilterProp="children"
				>
					{clients.map((client, i) => {
						return (
							<Option key={'client' + i} value={client.id}>
								{client.clientName}
							</Option>
						)
					})}
				</Select>
			</SelectContainer>
		</Container>
	)
}

export default SelectClient

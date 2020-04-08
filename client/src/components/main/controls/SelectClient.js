import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { CLIENT_LIST } from 'api/queries'
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

const SelectClient = ({ onChange }) => {
	const { loading, error, data } = useQuery(CLIENT_LIST)
	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

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
					{data.clientList.map((client, i) => {
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

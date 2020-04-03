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

const SelectClient = () => {
	const { loading, error, data } = useQuery(CLIENT_LIST)
	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const onChange = v => {
		console.log(v)
	}
	return (
		<Container>
			<SelectContainer>
				<label>Select Client</label>
				<Select placeholder="Select a client" onChange={onChange}>
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

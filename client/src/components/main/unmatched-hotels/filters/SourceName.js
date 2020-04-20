import React, { useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { SOURCE_NAME_LIST } from 'api/queries'
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

const SourceName = ({ onChange, templateCategory, value }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state
	const { loading, error, data } = useQuery(SOURCE_NAME_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			templateCategory,
		},
	})
	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	return (
		<Container>
			<SelectContainer>
				<label>Select Source Name</label>
				<Select
					showSearch
					placeholder="Select a client"
					onChange={(e) => onChange(e, 'sourceName')}
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0
					}
					optionFilterProp="children"
					value={value}
				>
					{data.sourceNameList.map((source, i) => {
						return (
							<Option key={'source' + i} value={source}>
								{source}
							</Option>
						)
					})}
				</Select>
			</SelectContainer>
		</Container>
	)
}

export default SourceName

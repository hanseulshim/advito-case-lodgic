import React, { useContext } from 'react'
import { store } from 'context/store'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { TEMPLATE_CATEGORY_LIST } from 'api/queries'
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

const SourceType = ({ onChange, value }) => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state

	const { loading, error, data } = useQuery(TEMPLATE_CATEGORY_LIST, {
		variables: { clientId, startDate: dateRange[0], endDate: dateRange[1] },
	})
	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	return (
		<Container>
			<SelectContainer>
				<label>Select Source Type</label>
				<Select
					showSearch
					placeholder="Select Source Type"
					onChange={(e) => onChange(e, 'templateCategory')}
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0
					}
					optionFilterProp="children"
					value={value}
				>
					{data.templateCategoryList.map((template, i) => {
						return (
							<Option key={'template' + i} value={template}>
								{template}
							</Option>
						)
					})}
				</Select>
			</SelectContainer>
		</Container>
	)
}

export default SourceType

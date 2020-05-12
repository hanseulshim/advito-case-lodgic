import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Modal } from 'antd'
import { moreMatchesFilters } from '../../helper'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { error } = Modal

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;
	margin-top: 10px;
	margin-right: 10px;
	label {
		margin-right: 10px;
		text-transform: uppercase;
		font-size: 0.75em;
	}
`

const MatchFilters = ({ onSubmitFilters }) => {
	const [filters, setFilters] = useState({
		hotelName: '',
		hotelChainName: '',
		address1: '',
		cityName: '',
		stateCode: '',
		countryName: '',
		lanyonId: '',
		sabrePropertyId: '',
		apolloPropertyId: '',
		amadeusPropertyId: '',
		worldspanPropertyId: '',
	})

	const clearFilters = () => {
		setFilters({
			hotelName: '',
			hotelChainName: '',
			address1: '',
			cityName: '',
			stateCode: '',
			countryName: '',
			lanyonId: '',
			sabrePropertyId: '',
			apolloPropertyId: '',
			amadeusPropertyId: '',
			worldspanPropertyId: '',
		})
		onSubmitFilters({
			hotelName: '',
			hotelChainName: '',
			address1: '',
			cityName: '',
			stateCode: '',
			countryName: '',
			lanyonId: '',
			sabrePropertyId: '',
			apolloPropertyId: '',
			amadeusPropertyId: '',
			worldspanPropertyId: '',
		})
	}

	const onChange = (value, key) => {
		setFilters({
			...filters,
			[key]: value,
		})
	}

	const showError = () => {
		error({
			title: 'Error in filters',
			icon: <ExclamationCircleOutlined />,
			content: 'Please only use alphanumeric characters in filters',
		})
	}

	const submitTableFilters = () => {
		const validFilters = {}
		Object.keys(filters).map((filter) => {
			if (filters[filter]) {
				validFilters[filter] = filters[filter]
			}
		})
		if (
			Object.values(validFilters).some(
				(filter) => !filter.match(/^([a-zA-Z0-9 _-]+)$/)
			)
		) {
			showError()
		} else {
			onSubmitFilters({ ...validFilters })
		}
	}

	return (
		<Container id="filtersContainer">
			{moreMatchesFilters.map((filter) => {
				return (
					<InputContainer key={filter.label}>
						<label>{filter.label}</label>
						<Input
							placeholder={filter.placeholder}
							onChange={(e) => onChange(e.target.value, filter.value)}
							value={filters[filter.value]}
						/>
					</InputContainer>
				)
			})}
			<Button
				type="primary"
				shape="round"
				onClick={submitTableFilters}
				disabled={!Object.values(filters).length > 0}
			>
				Submit
			</Button>
			<Button onClick={clearFilters} danger shape="round">
				Clear
			</Button>
		</Container>
	)
}

export default MatchFilters

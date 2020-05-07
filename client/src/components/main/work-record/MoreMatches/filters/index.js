import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Input } from 'antd'
import { moreMatchesFilters } from '../../helper'

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	margin-top: 1em;
	margin-bottom: 2em;
	> div,
	button {
		margin-right: 15px;
	}
`

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;
	margin-top: 10px;
	label {
		margin-right: 10px;
		text-transform: uppercase;
		font-size: 0.75em;
	}
`

const MatchFilters = () => {
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

	const onChange = (value, key) => {
		setFilters({
			...filters,
			[key]: value,
		})
	}

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
	}

	const submitTableFilters = () => {}

	return (
		<Container>
			{moreMatchesFilters.map((filter, i) => {
				return (
					<InputContainer key={filter + i}>
						<label>{filter.label}</label>
						<Input
							placeholder={filter.placeholder}
							onChange={(e) => onChange(e.target.value, filter.value)}
							value={filters[filter.value]}
						/>
					</InputContainer>
				)
			})}

			<Button onClick={() => submitTableFilters()} type="primary" shape="round">
				Submit
			</Button>
			<Button onClick={clearFilters} danger shape="round">
				Clear
			</Button>
		</Container>
	)
}

export default MatchFilters

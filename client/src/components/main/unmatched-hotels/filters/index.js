import React, { useState, useContext } from 'react'
import { store } from 'context/store'
import styled from 'styled-components'
import CityName from './CityName'
import HotelName from './HotelName'
import SourceName from './SourceName'
import SourceType from './SourceType'
import SortType from './SortType'
import { Button } from 'antd'

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	margin-top: 1em;
	margin-bottom: 2em;
	> div,
	button {
		margin-right: 15px;
	}
`

const Filters = () => {
	const globalState = useContext(store)
	const { dispatch } = globalState

	const [filters, setFilters] = useState({
		hotelName: '',
		templateCategory: '',
		sourceName: '',
		cityName: '',
		sortType: '',
	})

	const onChange = (value, key) => {
		if (key === 'templateCategory') {
			setFilters({
				...filters,
				templateCategory: value,
				sourceName: '',
			})
		} else {
			setFilters({
				...filters,
				[key]: value,
			})
		}
	}

	const clearFilters = () => {
		setFilters({
			hotelName: '',
			templateCategory: '',
			sourceName: '',
			cityName: '',
			sortType: '',
		})
		dispatch({
			type: 'setFilters',
			value: {
				hotelName: '',
				templateCategory: '',
				sourceName: '',
				cityName: '',
				sortType: '',
			},
		})
	}

	const submitTableFilters = () => {
		dispatch({ type: 'setFilters', value: { ...filters } })
	}

	return (
		<Container>
			<HotelName onChange={onChange} value={filters.hotelName} />
			<SourceType onChange={onChange} value={filters.templateCategory} />
			<SourceName
				onChange={onChange}
				templateCategory={filters.templateCategory}
				value={filters.sourceName}
			/>
			<CityName onChange={onChange} value={filters.cityName} />
			<SortType onChange={onChange} value={filters.sortType} />
			<Button onClick={() => submitTableFilters()} type="primary" shape="round">
				Submit
			</Button>
			<Button onClick={clearFilters} danger shape="round">
				Clear
			</Button>
		</Container>
	)
}

export default Filters

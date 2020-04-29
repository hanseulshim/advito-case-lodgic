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
	const { dispatch, state } = globalState
	const { filters } = state

	const [localFilters, setFilters] = useState({
		hotelName: filters.hotelName,
		templateCategory: filters.templateCategory,
		sourceName: filters.sourceName,
		cityName: filters.cityName,
		sortType: filters.sortType,
	})

	const onChange = (value, key) => {
		if (key === 'templateCategory') {
			setFilters({
				...localFilters,
				templateCategory: value,
				sourceName: '',
			})
		} else {
			setFilters({
				...localFilters,
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
		dispatch({ type: 'setFilters', value: { ...localFilters } })
	}

	return (
		<Container>
			<HotelName onChange={onChange} value={localFilters.hotelName} />
			<SourceType onChange={onChange} value={localFilters.templateCategory} />
			<SourceName
				onChange={onChange}
				templateCategory={localFilters.templateCategory}
				value={localFilters.sourceName}
			/>
			<CityName onChange={onChange} value={localFilters.cityName} />
			<SortType onChange={onChange} value={localFilters.sortType} />
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

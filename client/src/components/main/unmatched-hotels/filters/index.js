import React, { useState } from 'react'
import styled from 'styled-components'
import CityName from './CityName'
import HotelName from './HotelName'
import SourceName from './SourceName'
import SourceType from './SourceType'
import { Button } from 'antd'

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	> div,
	button {
		margin-right: 15px;
	}
`

const Filters = ({ onSubmit }) => {
	const [filters, setFilters] = useState({
		hotelName: '',
		sourceType: '',
		sourceName: '',
		cityName: '',
	})

	const onChange = (value, key) => {
		if (key === 'sourceType') {
			setFilters({
				...filters,
				sourceType: value,
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
			sourceType: '',
			sourceName: '',
			cityName: '',
		})
	}
	return (
		<Container>
			<HotelName onChange={onChange} value={filters.hotelName} />
			<SourceType onChange={onChange} value={filters.sourceType} />
			<SourceName
				onChange={onChange}
				templateCategory={filters.sourceType}
				value={filters.sourceName}
			/>
			<CityName onChange={onChange} value={filters.cityName} />
			<Button onClick={() => onSubmit(filters)} type="primary" shape="round">
				Submit
			</Button>
			<Button onClick={clearFilters} danger shape="round">
				Clear
			</Button>
		</Container>
	)
}

export default Filters

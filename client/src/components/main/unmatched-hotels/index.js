import React, { useState } from 'react'

import Filters from './filters'
import UnmatchedHotelsTable from './UnmatchedHotelsTable'

const UnmatchedHotels = () => {
	const [filters, setFilters] = useState({})

	const submitTableFilters = (filters) => {
		const validFilters = {}
		Object.keys(filters).map((key) => {
			if (filters[key]) {
				validFilters[key] = filters[key]
			}
		})
		setFilters({
			...validFilters,
		})
	}

	return (
		<>
			<Filters onSubmit={submitTableFilters} />
			<UnmatchedHotelsTable filters={filters} />
		</>
	)
}

export default UnmatchedHotels

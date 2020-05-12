import React, { useState } from 'react'
import MatchFilters from './filters'

const MoreMatches = () => {
	const [filters, setFilters] = useState({})

	const onSubmitFilters = (filterObj) => {
		console.log(filterObj)
		setFilters(filterObj)
	}

	return (
		<>
			<h4>FIND MORE MATCHES: </h4>
			<MatchFilters onSubmitFilters={onSubmitFilters} />
		</>
	)
}

export default MoreMatches

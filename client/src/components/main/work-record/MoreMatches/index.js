/* eslint-disable react/display-name */
import React, { useState } from 'react'
import styled from 'styled-components'
import MatchFilters from './filters'
import MoreMatchesTable from './MoreMatchesTable'

const Container = styled.div`
	padding-bottom: 2em;
`

const MoreMatches = ({ onMatchHotel, matchedHotel }) => {
	const [filters, updateFilters] = useState({})

	const setFilters = (filterObj) => {
		updateFilters(filterObj)
	}

	return (
		<Container>
			<h4>FIND MORE MATCHES: </h4>
			<MatchFilters setFilters={setFilters} />
			{Object.keys(filters).length > 0 && (
				<MoreMatchesTable
					filters={filters}
					onMatchHotel={onMatchHotel}
					matchedHotel={matchedHotel}
				/>
			)}
		</Container>
	)
}

export default MoreMatches

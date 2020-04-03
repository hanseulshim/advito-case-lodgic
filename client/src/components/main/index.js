import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Navigation from './navigation'

const MainContainer = styled.div`
	padding: ${props => props.theme.padding};
	height: 100%;
	min-width: 1000px;
	max-width: 1500px;
`

const IngestionHistory = () => (
	<MainContainer>
		<Header />
		<Navigation />
	</MainContainer>
)

export default IngestionHistory

import React from 'react'
import styled from 'styled-components'
import Header from './header'
import Navigation from './navigation'

const MainContainer = styled.div`
	padding: ${props => props.theme.padding};
	height: 100%;
`

const IngestionHistory = () => (
	<MainContainer>
		<Header />
		<Navigation />
	</MainContainer>
)

export default IngestionHistory

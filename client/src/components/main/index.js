import React from 'react'
import styled from 'styled-components'
import Header from './header'

const MainContainer = styled.div`
	padding: ${props => props.theme.padding};
	height: 100%;
`

const Main = () => (
	<MainContainer>
		<Header />
	</MainContainer>
)

export default Main

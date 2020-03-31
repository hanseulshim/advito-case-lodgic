import React from 'react'
import styled from 'styled-components'
import bcdLogo from 'assets/bcdLogo.png'
import Sidebar from 'components/sidebar'

const MainContainer = styled.div`
	width: 100%;
	min-height: 100%;
	display: flex;
`

const Header = styled.div`
	margin-bottom: ${props => props.theme.verticalSpace};
`

const Main = () => (
	<>
		<MainContainer>
			<Header>
				<img src={bcdLogo} alt="BCD logo" />
				<Sidebar />
			</Header>
		</MainContainer>
	</>
)

export default Main

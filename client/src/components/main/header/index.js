import React from 'react'
import styled from 'styled-components'
import bcdLogo from 'assets/bcdLogo.png'
import User from './user'
import { Title } from 'components/common/Typography'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 75%;

	img {
		height: 55px;
	}
`

const TitleStyled = styled(Title)`
	position: relative;
	top: 10px;
	right: 20%;
`

const Header = () => {
	return (
		<Container>
			<img src={bcdLogo} />
			<TitleStyled>Hotel Data Portal</TitleStyled>
			<User />
		</Container>
	)
}

export default Header

import React from 'react'
import styled from 'styled-components'
import bcdLogo from 'assets/bcdLogo.png'
import User from './user'
import { Title } from 'components/common/Typography'

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	img {
		height: 55px;
		margin-right: 100px;
	}
`

const TitleStyled = styled(Title)`
	position: relative;
	top: 10px;
	margin-right: auto;
`

const Header = () => {
	return (
		<Container>
			<img src={bcdLogo} alt="BCD Logo" />
			<TitleStyled>CASE Lodgic</TitleStyled>
			<User />
		</Container>
	)
}

export default Header

import React from 'react'
import styled from 'styled-components'
import { Title } from 'components/common/Typography'
import { UserOutlined } from '@ant-design/icons'
import { getUser } from 'helper'
import NavMenu from './NavMenu'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Avatar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: ${props => props.theme.doveGray};
	padding: 15px;
	font-size: 1.5em;
	color: ${props => props.theme.white};
`

const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-bottom: 0.25em;
`

const User = () => {
	const user = getUser()
	return (
		<Container>
			<TitleContainer>
				<Avatar>
					<UserOutlined />
				</Avatar>
				<NavMenu />
			</TitleContainer>
			<div>
				<Title>{user.displayName}</Title>
			</div>
		</Container>
	)
}

export default User

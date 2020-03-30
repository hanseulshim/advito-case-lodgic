import React from 'react'
import styled from 'styled-components'
import SidebarUserInfo from './SidebarUserInfo'

const Container = styled.div`
	background: ${props => props.theme.concrete};
	padding: ${props => props.theme.verticalSpace},
		${props => props.theme.horizontalSpace};
	flex: 1;
	min-width: 320px;
	max-width: 400px;
`

const Sidebar = () => {
	return (
		<>
			<SidebarUserInfo />
		</>
	)
}

export default Sidebar

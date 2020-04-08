import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import theme from 'styles/variables'
import GlobalStyle from 'styles/GlobalStyle'
import Login from 'components/login'
import { getToken } from 'helper'
import Main from 'components/main'
import ResetPassword from 'components/login/ResetPassword'
// Context
import { StateProvider } from 'context/store'

const PrivateRoute = ({ component: Component }) => (
	<Route
		render={() => (getToken() ? <Component /> : <Redirect to="/login" />)}
	/>
)

const App = () => (
	<ThemeProvider theme={theme}>
		<StateProvider>
			<GlobalStyle />
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/resetpassword" component={ResetPassword} />
				<PrivateRoute path="/" component={Main} />
			</Switch>
		</StateProvider>
	</ThemeProvider>
)

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
}

export default App

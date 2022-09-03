import { Redirect, Route, Router, Switch } from 'wouter';
import Login from '../src/components/login/Login';
import { getLocalStorageToken } from './utils/getLocalStorageToken';
import OrganisationDashboard from './views/OrganisationDashboard';
import UserDashboard from './views/UserDashboard';
import TeamTable from '../src/components/organization-dashboard/TeamTable';

function App() {
	// return <UserDashboard />;
	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/auth"
					component={() => {
						if (getLocalStorageToken()) {
							return <Redirect to="/user/dashboard" />;
						} else {
							return <Login />;
						}
					}}
				/>
				<Route
					exact
					path="/user/dashboard"
					component={() => {
						if (getLocalStorageToken()) {
							return <UserDashboard />;
						} else {
							return <Redirect to="/auth" />;
						}
					}}
					redirectTo="/auth"
				/>
				<Route exact path="/org/dashboard/teams/:id" component={() => <TeamTable />} />
				<Route path="/org/:id" component={() => <OrganisationDashboard />} />
				<Route path="/" component={() => <Redirect to="/login" />} />
			</Switch>
		</Router>
	);
}

export default App;

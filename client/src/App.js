
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header/Header'
import Navbar from './components/Nav/Nav';
import Profile from '../src/components/UserProfile/UserProfile'
// import Login from './pages/Login';
// import Nav from './components/Nav';
// import NoMatch from './pages/NoMatch';
// import Signup from './pages/Signup';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
  return (
	<ApolloProvider client={client}>
		<Router>
			<Header/>
				<Navbar/>
				<Routes>
					<Route path={'/'} element={} />
					<Route path={'/profile'} element={<Profile />} />
					<Route path={'/:skateSpotId'} element={}/>
					<Route path={'/newspot'} element={}/>
					<Route path={'/login'} element={}/>
					<Route path={'/signup'} element={}/>
				</Routes>
		</Router>
	</ApolloProvider>
 
  );
}

export default App;
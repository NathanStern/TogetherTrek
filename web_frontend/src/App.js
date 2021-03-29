import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import SearchScreen from './screens/SearchScreen'
import CreateTripScreen from './screens/CreateTripScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import PostsScreen from './screens/PostsScreen'
import TripsScreen from './screens/TripsScreen'
import EditPostScreen from './screens/EditPostScreen'
import MakePostScreen from './screens/MakePostScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import PersonalProfileScreen from './screens/PersonalProfileScreen'
import FriendsScreen from './screens/FriendsScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import MessagesScreen from './screens/MessagesScreen'
function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' component={HomeScreen} exact />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/search' component={SearchScreen} exact />
					<Route path='/createtrip' component={CreateTripScreen} />
					<Route path='/profile' component={PersonalProfileScreen} exact />
					<Route path='/post' component={MakePostScreen} />
					<Route path='/editpost' component={EditPostScreen} />
					<Route path='/posts' component={PostsScreen} />
					<Route path='/editprofile' component={EditProfileScreen} exact />
					<Route path='/createpost' component={CreatePostScreen} />
					<Route path='/profile/:id' component={ProfileScreen} exact />
					<Route path='/friends' component={FriendsScreen} />
					<Route path='/notifications' component={NotificationsScreen} />
					<Route path='/messages' component={MessagesScreen} />
					<Route path='/trips' component={TripsScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App

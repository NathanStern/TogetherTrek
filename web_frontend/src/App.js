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
import ChangeSensInfoScreen from './screens/ChangeSensInfoScreen'
import PostsScreen from './screens/PostsScreen'
import TripsScreen from './screens/TripsScreen'
import ViewTripScreen from './screens/ViewTripScreen'
import EditPostScreen from './screens/EditPostScreen'
import MakePostScreen from './screens/MakePostScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import FriendsScreen from './screens/FriendsScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import MessagesScreen from './screens/MessagesScreen'
import OtherProfileScreen from './screens/OtherProfileScreen'
import MessageBoardScreen from './screens/MessageBoardScreen.js'
import BlockedUsersScreen from './screens/BlockedUsersScreen'
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
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/post' component={MakePostScreen} />
          <Route path='/editpost' component={EditPostScreen} />
          <Route path='/posts' component={PostsScreen} />
          <Route path='/editprofile' component={EditProfileScreen} exact />
          <Route
            path='/change-sens-info'
            component={ChangeSensInfoScreen}
            exact
          />
          <Route path='/createpost' component={CreatePostScreen} />
          <Route path='/profile/:id' component={OtherProfileScreen} exact />
          <Route path='/friends' component={FriendsScreen} />
          <Route path='/notifications' component={NotificationsScreen} />
          <Route path='/messages' component={MessagesScreen} exact />
          <Route path='/trips' component={TripsScreen} />
          <Route path='/trip/:id' component={ViewTripScreen} />
          <Route path='/messages/:id' component={MessageBoardScreen} />
          <Route path='/blocked' component={BlockedUsersScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App

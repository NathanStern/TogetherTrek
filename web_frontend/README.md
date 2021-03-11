To run the frontend, you need to run backend (check backend's README) and install required dependencies("npm install"). To run the frontend use "npm start"

For state management Redux is used. User info is stored in "userLogin" state as "userInfo", to get it use
" const { userInfo } = useSelector((state) => state.userLogin) "(and import {useSelector} from 'react-redux' )

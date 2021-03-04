import React, { useState } from 'react'
const logo = {
    uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    width: 64,
    height: 64
};
const ProfileScreen = () => {
    return (
    <div>
        <img source={logo} />
        Will contain profile info
    </div>
    )
}
export default ProfileScreen
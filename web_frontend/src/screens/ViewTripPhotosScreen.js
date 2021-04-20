import React, { useEffect, useState } from 'react'
import { Card, CardColumns } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { path } from '../constants/pathConstant'

const Photo = ({ id }) => {
  return (
    <Card>
      <Card.Img src={`${path}/trip_photos/${id}`} />
    </Card>
  )
}
const ViewTripPhotosScreen = ({ location, history, useParams }) => {
  const [photos, setPhotos] = useState()
  const { pathname } = useLocation()
  const id = pathname.split('/')[2]
  console.log(id)
  useEffect(async () => {
    const { data } = await axios.get(`${path}/trip_photos/trip/${id}`)

    console.log(data)
    setPhotos(data)
  }, [])
  return (
    <>
      <h1>View Photos</h1>
      <CardColumns>
        {photos && photos.map((el) => <Photo id={el._id} key={el._id} />)}
      </CardColumns>
    </>
  )
  //   return <div>View Photos {`${id}`}</div>
}

export default ViewTripPhotosScreen

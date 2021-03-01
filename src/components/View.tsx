import React from 'react'
import {useSelector} from 'react-redux';
// import { Scene } from 'react-babylonjs';

const View = () => {
  const items = useSelector((data: any) => data.items);
  console.log(items)
  return (
    <div>
      1
    </div>
  )
}

export default View
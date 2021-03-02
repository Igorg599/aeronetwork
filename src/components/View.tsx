import React from 'react'
import {useSelector} from 'react-redux';
import { Engine, Scene } from 'react-babylonjs'
import { Vector3 } from '@babylonjs/core';


const View = () => {
  const items = useSelector((data: any) => data.items);
  console.log(items)
  return (
    <div>
      <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
        <Scene>
          <arcRotateCamera name='camera' alpha={30} beta={50} radius={10} target={Vector3.Zero()} setPosition={[new Vector3(0, 50, 40)]}
                lowerBetaLimit={0.1} upperBetaLimit={(Math.PI / 1) * 0.99} lowerRadiusLimit={100}
              />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />   
          <ground name="ground1" width={22} height={22} subdivisions={2}  />
          {items && items.map((item: any, index: any) => (
            <box key={index} name="box" size={0.1} height={(item[1].point.y - item[0].point.y)} width={(item[1].point.x - item[0].point.x)} depth={(item[1].point.z - item[0].point.z)} position={new Vector3((item[0].point.x + ((item[1].point.x - item[0].point.x) / 2)), (item[0].point.y + ((item[1].point.y - item[0].point.y) / 2)), (item[0].point.z + ((item[1].point.z - item[0].point.z) / 2)))}/>
          ))}
        </Scene>
      </Engine>
    </div>
  )
}

export default View
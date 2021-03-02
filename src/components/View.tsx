import React from 'react'
import {useSelector} from 'react-redux';
import { Engine, Scene, Skybox } from 'react-babylonjs'
import { Vector3 } from '@babylonjs/core';

const SkyboxScenes = [{
  name: 'sunny day',
  texture: `${process.env.PUBLIC_URL}/textures/TropicalSunnyDay`
}]

const View = () => {
  const items = useSelector((data: any) => data.items);
  console.log(items)
  return (
    <div>
      <Engine antialias={true} width={500} height={500} adaptToDeviceRatio={true} canvasId="sample-canvas">
        <Scene>
          <arcRotateCamera name="arc" target={ new Vector3(-60, 45, -40) }
                    alpha={-Math.PI / 2} beta={(0.5 + (Math.PI / 4))}
                    radius={40} minZ={0.001} wheelPrecision={50}/>
          <Skybox rootUrl={SkyboxScenes[Math.abs(0) % SkyboxScenes.length].texture} />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />   
          {items && items.map((item: any, index: any) => (
            <box key={index} name="box" size={0.1} height={(item[1].point.y - item[0].point.y)} width={(item[1].point.x - item[0].point.x)} depth={(item[1].point.z - item[0].point.z)} position={new Vector3((item[0].point.x + ((item[1].point.x - item[0].point.x) / 2)), (item[0].point.y + ((item[1].point.y - item[0].point.y) / 2)), (item[0].point.z + ((item[1].point.z - item[0].point.z) / 2)))}/>
          ))}
        </Scene>
      </Engine>
    </div>
  )
}

export default View
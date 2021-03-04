import React from 'react'
import {useSelector} from 'react-redux';
import { Engine, Scene, Skybox } from 'react-babylonjs'
import { Vector3, Quaternion, Color3 } from '@babylonjs/core';

const SkyboxScenes: {
  name: string;
  texture: string;
}[] = [{
  name: 'sunny day',
  texture: `${process.env.PUBLIC_URL}/textures/TropicalSunnyDay`
}]

const View: () => JSX.Element = () => {
  const items: any = useSelector((data: any) => data.items)
  return (
    <div>
      <Engine antialias={true} width={500} height={500} adaptToDeviceRatio={true} canvasId="sample-canvas">
        <Scene>
          <arcRotateCamera name="arc" target={ new Vector3(-60, -40, 48) }
                    alpha={-Math.PI / 2} beta={(0.5 + (Math.PI / 4))}
                    radius={38} minZ={0.001} wheelPrecision={50}/>
          <Skybox rootUrl={SkyboxScenes[Math.abs(0) % SkyboxScenes.length].texture} />
          <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />   
          {items && items.map((item: any, index: any) => (
            <box key={index} name='box' id='11' width={0.1} depth={0.1} height={Vector3.Distance(new Vector3(item[1].point.x, item[1].point.z, item[1].point.y), new Vector3(item[0].point.x, item[0].point.z, item[0].point.y))}  rotationQuaternion={Quaternion.RotationAxis(Vector3.Cross(new Vector3(item[0].point.x, item[0].point.z, item[0].point.y).subtract(new Vector3(item[1].point.x, item[1].point.z, item[1].point.y)).normalize(), new Vector3(0, 1, 0)).normalize(), -Math.acos(Vector3.Dot(new Vector3(item[0].point.x, item[0].point.z, item[0].point.y).subtract(new Vector3(item[1].point.x, item[1].point.z, item[1].point.y)).normalize(), new Vector3(0, 1, 0))))} position={new Vector3((item[0].point.x + item[1].point.x)/2, (item[0].point.z + item[1].point.z)/2, (item[0].point.y + item[1].point.y)/2)}>
              <standardMaterial name='groundMat' specularColor={Color3.Green()} diffuseColor={Color3.Yellow()}/>
            </box>
          ))}
        </Scene>
      </Engine>
    </div>
  )
}

export default View

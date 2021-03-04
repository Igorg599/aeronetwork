import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {loadData} from '../redux/action/index'
import styled from 'styled-components'

const Nav = styled.div`
  position: fixed;
  width: 100vw;
  height: 64px;
  background-color: rgb(236, 226, 236);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid rgb(211, 188, 224);
  padding: 5px;
  h1 {
    font-size: 18px;
    line-height: 18px;
    margin: 0;
  }
`
const Loader = styled.input`
  text-decoration: none;
  height: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  padding: 5px 15px;
  margin: 5px 20px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-image: linear-gradient(to right, #9EEFE1 0%, #4830F0 51%, #9EEFE1 100%);
  background-size: 200% auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: .5s;
  outline: none;
  font-size: 13px;
  line-height: 13px;
  &:hover {
    background-position: right center;
  }
`

const Header: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const title: any = useSelector((data: any) => data.title);
  const [file, setFile] = useState({});

  if (Object.keys(file).length !== 0) {
    dispatch(loadData(file));
  }

  const onChange = (e: any) => {
    if (Object.keys(file).length !== 0) {
      setFile({})
    }
    if (e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e: any) => {
        setFile({ file: JSON.parse(e.target.result) });
      };
    }
  }
  
  return (
    <Nav>
      <Loader type="file" onChange={onChange} accept=".json"/>
      <h1>{title && title}</h1>
    </Nav>
  )
}

export default Header
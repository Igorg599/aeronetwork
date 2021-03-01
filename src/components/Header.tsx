import { useDispatch } from 'react-redux'
import {fetchData} from '../redux/action/index';

const Header = () => {
  const dispatch = useDispatch();
  const onSetData = () => {
    dispatch(fetchData());
  }
  
  return (
    <div className="header">
    <button type="button" onClick={() => onSetData()}>Загрузить схему</button>
  </div>
  )
}

export default Header
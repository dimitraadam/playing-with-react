import {useLocation} from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <p>{`The path ${location.pathname} not found`}</p>
  );
};

export default NotFound;
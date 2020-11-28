import {useLocation} from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  return (
    <p style={{margin:20}}>{`Sorry... The path '${location.pathname}' was not found`}</p>
  );
};

export default NotFound;
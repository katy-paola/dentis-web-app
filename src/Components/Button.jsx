import { Link } from 'react-router-dom';

const Button = ({ route, text, bgColor }) => {
  return (
    <Link to={route} className={`main__button btn-${bgColor}`}>
      {text}
    </Link>
  );
};

export default Button;

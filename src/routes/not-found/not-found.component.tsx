import { useNavigate } from 'react-router-dom';

import Button, {
  BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';

import {
  NotFoundContainer,
  ErrorCode,
  ErrorTitle,
  Description,
  Container,
} from './not-found.styles';

const NotFound = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <NotFoundContainer>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page not found</ErrorTitle>
        <Description>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </Description>
        <Button onClick={backToHome} buttonType={BUTTON_TYPE_CLASSES.base}>
          BACK TO HOME
        </Button>
      </NotFoundContainer>
    </Container>
  );
};

export default NotFound;

import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: var(--primary-color);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: var(--dark-color);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    background-color: #2980b9;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Message>
      <HomeButton to="/">Back to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;

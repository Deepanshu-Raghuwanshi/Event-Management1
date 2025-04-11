import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const HeroSection = styled.section`
  background-color: var(--primary-color);
  color: white;
  padding: 4rem 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: white;
  color: var(--primary-color);

  &:hover {
    background-color: var(--light-color);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const FeatureDescription = styled.p`
  color: #666;
`;

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <HomeContainer>
      <HeroSection>
        <Title>Welcome to Event Management System</Title>
        <Subtitle>
          Create, manage, and discover events with our easy-to-use platform.
          Whether you're organizing a small meetup or a large conference, we've
          got you covered.
        </Subtitle>
        <ButtonContainer>
          {isAuthenticated ? (
            <>
              <PrimaryButton to="/events/create">Create Event</PrimaryButton>
              <SecondaryButton to="/events">Browse Events</SecondaryButton>
            </>
          ) : (
            <>
              <PrimaryButton to="/register">Get Started</PrimaryButton>
              <SecondaryButton to="/login">Sign In</SecondaryButton>
            </>
          )}
        </ButtonContainer>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>Create Events</FeatureTitle>
          <FeatureDescription>
            Easily create and customize events with all the details your
            attendees need to know.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Manage Events</FeatureTitle>
          <FeatureDescription>
            Update event details, track attendance, and communicate with
            attendees all in one place.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Discover Events</FeatureTitle>
          <FeatureDescription>
            Find events that match your interests and connect with like-minded
            people.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;

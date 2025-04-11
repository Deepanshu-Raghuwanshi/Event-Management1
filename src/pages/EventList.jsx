import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/api";
import EventCard from "../components/events/EventCard";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const EventListContainer = styled.div`
  padding: 1rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  color: var(--dark-color);
`;

const CreateButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    background-color: #2980b9;
  }
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoEvents = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  text-align: center;
  padding: 1rem;
  background-color: #fadbd8;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <LoadingSpinner>Loading events...</LoadingSpinner>;
  }

  return (
    <EventListContainer>
      <Header>
        <Title>All Events</Title>
        {isAuthenticated && (
          <CreateButton to="/events/create">Create Event</CreateButton>
        )}
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {events.length === 0 ? (
        <NoEvents>
          <h3>No events found</h3>
          <p>Be the first to create an event!</p>
        </NoEvents>
      ) : (
        <EventGrid>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </EventGrid>
      )}
    </EventListContainer>
  );
};

export default EventList;

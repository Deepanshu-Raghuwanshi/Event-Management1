import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const EventDetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const EventHeader = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 2rem;
`;

const EventTitle = styled.h1`
  margin-bottom: 0.5rem;
`;

const EventMeta = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const EventContent = styled.div`
  padding: 2rem;
`;

const EventDescription = styled.p`
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const EventInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #666;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.span`
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BackButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #95a5a6;
  color: white;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    background-color: #7f8c8d;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const EditButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    background-color: #25a25a;
  }
`;

const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--danger-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
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

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event details. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        navigate("/events");
      } catch (err) {
        setError("Failed to delete event. Please try again.");
      }
    }
  };

  if (loading) {
    return <LoadingSpinner>Loading event details...</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!event) {
    return <ErrorMessage>Event not found</ErrorMessage>;
  }

  // Make sure both IDs are numbers for comparison
  const isOwner =
    currentUser && Number(currentUser.id) === Number(event.userId);
  console.log(
    "Current user ID:",
    currentUser?.id,
    "Event user ID:",
    event.userId,
    "Is owner:",
    isOwner
  ); // For debugging

  return (
    <EventDetailContainer>
      <EventHeader>
        <EventTitle>{event.title}</EventTitle>
        <EventMeta>
          <span>
            {event.date} at {event.time}
          </span>
          <span>{event.location}</span>
        </EventMeta>
      </EventHeader>

      <EventContent>
        <EventDescription>{event.description}</EventDescription>

        <EventInfo>
          <InfoItem>
            <InfoLabel>Date</InfoLabel>
            <InfoValue>{event.date}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Time</InfoLabel>
            <InfoValue>{event.time}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>{event.location}</InfoValue>
          </InfoItem>
        </EventInfo>

        <ButtonGroup>
          <BackButton to="/events">Back to Events</BackButton>

          {isOwner && (
            <ActionButtons>
              <EditButton to={`/events/edit/${event.id}`}>Edit</EditButton>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </ActionButtons>
          )}
        </ButtonGroup>
      </EventContent>
    </EventDetailContainer>
  );
};

export default EventDetail;

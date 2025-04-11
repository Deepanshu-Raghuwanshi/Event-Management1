import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--dark-color);
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const CardDescription = styled.p`
  margin-bottom: 1.5rem;
  color: #333;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: ${(props) => (props.hasEditButton ? "column" : "row")};
    gap: 0.5rem;
  }
`;

const ViewButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const EditButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 4px;
  margin-left: 0.5rem;
  text-align: center;

  &:hover {
    background-color: #25a25a;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
  }
`;

const EventCard = ({ event }) => {
  const { currentUser } = useAuth();
  // Make sure both IDs are numbers for comparison
  const isOwner =
    currentUser && Number(currentUser.id) === Number(event.userId);
  console.log(
    "Card - User ID:",
    currentUser?.id,
    "Event user ID:",
    event.userId,
    "Is owner:",
    isOwner
  ); // For debugging

  return (
    <Card>
      <CardContent>
        <CardTitle>{event.title}</CardTitle>
        <CardMeta>
          <span>
            {event.date} at {event.time}
          </span>
          <span>{event.location}</span>
        </CardMeta>
        <CardDescription>
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </CardDescription>
        <CardActions hasEditButton={isOwner}>
          <ViewButton to={`/events/${event.id}`}>View Details</ViewButton>
          {isOwner && (
            <EditButton to={`/events/edit/${event.id}`}>Edit</EditButton>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default EventCard;

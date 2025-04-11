import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import EventForm from "../components/events/EventForm";
import styled from "styled-components";

const EditEventContainer = styled.div`
  padding: 1rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--dark-color);
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  text-align: center;
  padding: 1rem;
  background-color: #fadbd8;
  border-radius: 8px;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EditEvent = () => {
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

        // Check if the current user is the owner of the event
        // Make sure both IDs are numbers for comparison
        if (Number(data.userId) !== Number(currentUser.id)) {
          console.log(
            "Edit - Not owner. Event user ID:",
            data.userId,
            "Current user ID:",
            currentUser.id
          );
          navigate("/events");
          return;
        }
        console.log(
          "Edit - Is owner. Event user ID:",
          data.userId,
          "Current user ID:",
          currentUser.id
        );

        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch event details. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, currentUser, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const updatedEvent = {
        ...event,
        ...formData,
      };

      await updateEvent(id, updatedEvent);
      navigate(`/events/${id}`);
    } catch (err) {
      setError("Failed to update event. Please try again.");
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

  return (
    <EditEventContainer>
      <Title>Edit Event</Title>
      <EventForm
        event={event}
        onSubmit={handleSubmit}
        formTitle="Edit Event Details"
      />
    </EditEventContainer>
  );
};

export default EditEvent;

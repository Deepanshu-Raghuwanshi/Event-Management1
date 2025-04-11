import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import EventForm from "../components/events/EventForm";
import styled from "styled-components";

const CreateEventContainer = styled.div`
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

const CreateEvent = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      const newEvent = {
        ...formData,
        userId: Number(currentUser.id), // Ensure ID is a number
      };

      console.log("Creating event with user ID:", newEvent.userId);

      await createEvent(newEvent);
      navigate("/events");
    } catch (err) {
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <CreateEventContainer>
      <Title>Create New Event</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <EventForm onSubmit={handleSubmit} formTitle="Event Details" />
    </CreateEventContainer>
  );
};

export default CreateEvent;

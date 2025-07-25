// Workouts.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutCard from "../components/cards/WorkoutCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { getWorkouts } from "../api";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + "15"};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Right = styled.div`
  flex: 1;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const Workouts = () => {
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      const formattedDate = selectedDate.format("MM/DD/YYYY");
      const res = await getWorkouts(token, formattedDate);
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setTodaysWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [selectedDate]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
          </LocalizationProvider>
        </Left>

        <Right>
          <Section>
            <SecTitle>Workouts on {selectedDate.format("MMMM D, YYYY")}</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {todaysWorkouts.length > 0 ? (
                  todaysWorkouts.map((workout) => (
                    <WorkoutCard key={workout._id} workout={workout} />
                  ))
                ) : (
                  <div>No workouts found for selected date.</div>
                )}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Workouts;

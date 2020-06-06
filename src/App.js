import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: ${({ theme }) => `3px solid ${theme.darkTheme.darkGray[1]}`};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.darkGray};
`;

const Button = styled.button`
  background-color: ${({ success, danger }) => (success ? "green" : danger ? "red" : null)};
`;

const List = styled.li`
  color: ${(props) => (props.time % 2 === 0 ? "red" : "blue")};
`;

const App = () => {
  const [isActive, toggleActive] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setInitialTime((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && initialTime !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, initialTime]);

  const handleReset = () => {
    toggleActive(false);
    setInitialTime(0);
  };

  const handleRecord = () => {
    setTimes((prev) => [...prev, initialTime]);
  };

  return (
    <Container>
      <Title>Timer: {initialTime}</Title>
      <Button success onClick={() => toggleActive((prev) => !prev)}>
        {isActive ? "Pause" : "Start"}
      </Button>
      <Button danger onClick={handleReset}>
        Reset
      </Button>
      {!isActive && initialTime !== 0 ? (
        <Button onClick={handleRecord} success>
          Record
        </Button>
      ) : null}
      {times.length > 0 ? (
        <ul>
          {times.map((time) => (
            <List time={time}>{time}</List>
          ))}
        </ul>
      ) : null}
    </Container>
  );
};

export default App;

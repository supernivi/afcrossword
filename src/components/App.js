import "./App.scss";

import Crossword from "@jaredreisinger/react-crossword";
import { Grid, useToasts } from "@zeit-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Logo from "../assets/img/logo.png";
import GameLogo from "../assets/img/crossword.png";
import data from "./../const/data_1";

function App() {
  const crossword = useRef();
  let history = useHistory();
  const [, setToast] = useToasts();
  const [start, setStart] = useState();

  // eslint-disable-next-line
  useEffect(() => setStart(window.performance.now()), []);

  // eslint-disable-next-line
  const fillAllAnswers = useCallback((_event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((_event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message) => {
    setMessages((m) => m.concat(`${message}\n`));
  }, []);

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`);
    },
    [addMessage]
  );

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`
          )
          .join("\n")}`
      );
    },
    [addMessage]
  );

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`);
    },
    [addMessage]
  );

  // Check if crossword correct
  const checkCrossword = () => {
    const check = crossword.current.isCrosswordCorrect();
    if (check) {
      var end = window.performance.now();
      var time = ((end - start) / 1000 / 60).toFixed(2);
      localStorage.setItem("time", time);
      console.log(time);
      history.push("/finish");
    } else {
      console.log(check);
      click("warning");
    }
  };

  const click = (type) =>
    setToast({
      text: "Some answers are wrong or missing!",
      type,
    });

  return (
    <Page className="page">
      <img
        className="af-fullLogo"
        src={Logo}
        alt="Artfervour Logo"
        onDoubleClick={fillAllAnswers}
      />
      <img className="af-game-Logo" src={GameLogo} alt="Artfervour Crossword" />

      <p className="af-sub-text">
        Ditch the newspaper, play our Art Crossword on any device, anywhere.
        <br className="br" />
        &nbsp;Don't forget to come back every week as the game is updated weekly
        bringing forth a whole new challenge!
      </p>

      <CrosswordWrapper className="CrosswordWrapper">
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCellChange={onCellChange}
          columnBreakpoint={"1920px"}
        />
      </CrosswordWrapper>
      <Grid.Container className="actualGrid">
        <Grid>
          <button className="button" onClick={reset}>
            Reset
          </button>
        </Grid>
        <Grid>
          <button className="button" onClick={() => checkCrossword()}>
            Submit
          </button>
        </Grid>
      </Grid.Container>
      {console.log(messages.toString())}
    </Page>
  );
}

export default App;

// Styled-components

const Page = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const CrosswordWrapper = styled.div`
  margin-top: 2em;
  // max-width: 30em;

  /* and some fun making use of the defined class names */

  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }

    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`;

Crossword.defaultProps = {
  theme: {
    columnBreakpoint: "992px",
    gridBackground: "transparent",
    cellBackground: "#dfdfdf",
    focusBackground: "#416eea69",
    highlightBackground: "#ccd2debd",
    cellBorder: "transparent",
    numberColor: "#333",
    textColor: "#555",
  },
};

import "./App.scss";

import Crossword from "@jaredreisinger/react-crossword";
import React, { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";

import Logo from "../assets/img/logo.png";
import data from "./../const/data_1";

import { useHistory } from "react-router-dom";

import { useToasts, Button, Grid } from "@zeit-ui/react";

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  const crossword = useRef();
  let history = useHistory();
  const [, setToast] = useToasts();

  // const focus = useCallback((_event) => {
  //   crossword.current.focus();
  // }, []);

  // eslint-disable-next-line
  const fillAllAnswers = useCallback((_event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback((_event) => {
    crossword.current.reset();
  }, []);

  // We don't really *do* anything with callbacks from the Crossword component,
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
      history.push("/finish");
    } else {
      console.log(check);
      click("warning");
    }
  };

  const click = (type) =>
    setToast({
      text: "Some answers are wrong!",
      type,
    });

  return (
    <Page className="page">
      <h1 className="af-header-title">
        <img
          className="af-fullLogo"
          src={Logo}
          alt="Artfervour Logo"
          onDoubleClick={fillAllAnswers}
        />
      </h1>

      <CrosswordWrapper className="CrosswordWrapper mt-0">
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCellChange={onCellChange}
          columnBreakpoint={"1920px"}
        />
      </CrosswordWrapper>
      <Grid.Container gap={1} className="actualGrid" justify="space-around">
        <Grid>
          <Button type="secondary" onClick={reset}>
            Reset
          </Button>
        </Grid>
        <Grid>
          <Button type="success" onClick={() => checkCrossword()}>
            Submit
          </Button>
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
  max-width: 30em;

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
    columnBreakpoint: "1920px",
    gridBackground: "transparent",
    cellBackground: "#dfdfdf",
    focusBackground: "#416eea69",
    highlightBackground: "#ccd2debd",
    cellBorder: "transparent",
    numberColor: "#333",
    textColor: "#555",
  },
};

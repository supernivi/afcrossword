import React, { useCallback, useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styled from "styled-components";
import "./App.css";
import data from "./../const/data_1";

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  const crossword = useRef();

  const focus = useCallback((_event) => {
    crossword.current.focus();
  }, []);

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

  return (
    <Page>
      <Commands>
        <Command onClick={focus}>Focus</Command>
        <Command onClick={fillAllAnswers}>Fill all answers</Command>
        <Command onClick={reset}>Reset</Command>
      </Commands>

      <CrosswordWrapper>
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCellChange={onCellChange}
          columnBreakpoint={"1920px"}
        />
      </CrosswordWrapper>
      {console.log(messages.toString())}
    </Page>
  );
}

export default App;

// Styled-components

const Page = styled.div`
  padding: 2em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;
  flex-direction: column;
`;

const Commands = styled.div``;

const Command = styled.button`
  margin-right: 1em;
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
  },
};

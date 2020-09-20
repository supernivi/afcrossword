import './App.scss';

// @ts-ignore
import Crossword from '@jaredreisinger/react-crossword';
import { Grid, useToasts } from '@zeit-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import GameLogo from '../assets/img/crossword.png';
import Logo from '../assets/img/logo.png';
import { gaLog, linkHandleSameWindow, pageView } from '../const/common';
import data from '../const/data/data_30_8';

function App() {
  let history = useHistory();
  const crossword = useRef<any>();
  const [, setToast] = useToasts();
  const [start, setStart] = useState<number>();

  // eslint-disable-next-line
  useEffect(() => {
    setStart(window.performance.now());
    pageView(window.location.pathname + window.location.search);
  }, []);

  // eslint-disable-next-line
  const fillAllAnswers = useCallback((_event) => {
    crossword.current.fillAllAnswers();
  }, []);

  const reset = useCallback(() => {
    crossword.current.reset();
  }, []);

  // Check if crossword correct
  const checkCrossword = () => {
    const check = crossword.current.isCrosswordCorrect();
    if (check) {
      var end = window.performance.now();
      var time = ((end - start!) / 1000 / 60).toFixed(2);
      localStorage.setItem('time', time);
      console.log(time);
      history.push('/finish');
    } else {
      click('warning');
    }
  };

  const click = (type: any) =>
    setToast({
      text: 'Some answers are wrong or missing!',
      type,
    });

  return (
    <Page className="page">
      <img
        className="af-fullLogo"
        src={Logo}
        alt="Artfervour Logo"
        onClick={() => linkHandleSameWindow('https://www.artfervour.com/')}
      />
      <img
        className="af-game-Logo"
        src={GameLogo}
        alt="Artfervour Crossword"
        onDoubleClick={fillAllAnswers}
      />

      <p className="af-sub-text">
        Ditch the newspaper, play our Art Crossword on any device, anywhere.
        <br className="br" />
        &nbsp;Don't forget to come back every week as the game is updated weekly
        bringing forth a whole new challenge!
      </p>

      <CrosswordWrapper className="CrosswordWrapper">
        <Crossword data={data} ref={crossword} columnBreakpoint={'1920px'} />
      </CrosswordWrapper>
      <Grid.Container className="actualGrid">
        <Grid>
          <button
            className="button"
            onClick={() => {
              reset();
              gaLog('Button Click', 'User Pressed on reset');
            }}
          >
            Reset
          </button>
        </Grid>
        <Grid>
          <button
            className="button"
            onClick={() => {
              checkCrossword();
              gaLog('Button Click', 'User clicked on Submit');
            }}
          >
            Submit
          </button>
        </Grid>
      </Grid.Container>
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
      content: '\u2713'; /* a.k.a. checkmark: ✓ */
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
    columnBreakpoint: '992px',
    gridBackground: 'transparent',
    cellBackground: '#CCCCCC',
    focusBackground: '#EC7154',
    highlightBackground: '#F8E052',
    cellBorder: 'transparent',
    numberColor: '#000',
    textColor: '#555',
  },
};

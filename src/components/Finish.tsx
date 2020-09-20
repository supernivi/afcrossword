import './App.scss';

import { Grid, Spacer, Text } from '@zeit-ui/react';
import { Facebook, MessageCircle } from '@zeit-ui/react-icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../assets/img/logo.png';
import {
  gaLog,
  linkHandle,
  linkHandleSameWindow,
  pageView,
} from '../const/common';

function Finish() {
  let history = useHistory();
  const time = localStorage.getItem('time');

  React.useEffect(() => {
    pageView(window.location.pathname + window.location.search);
  }, []);

  return (
    <Page className="page">
      <Spacer y={1} />
      <img className="af-fullLogo" src={Logo} alt="Artfervour Logo" />
      <Spacer y={3} />
      <Text h3>
        <span style={{ opacity: 0.75, fontWeight: 400 }}>
          Wow! You're a crossword{' '}
        </span>{' '}
        <span
          style={{
            opacity: 0.8,
            fontSize: '110%',
            fontFamily: 'serif',
            letterSpacing: -0.6,
          }}
        >
          wizard!
        </span>
      </Text>
      <Spacer y={1} />
      <Text p style={opacity(0.85)}>
        Thank you for playing <b>AF CROSSWORD</b>
      </Text>
      <Text p style={opacity(0.6)}>
        Your last game took {time} minutes
      </Text>
      <Spacer y={2.6} />
      <button
        className="finalButton"
        onClick={() => {
          gaLog('Button Click', 'user restarted the game.');
          history.push('/');
        }}
      >
        Restart
      </button>
      <Spacer y={1} />
      <button
        className="finalButton"
        onClick={() => {
          linkHandleSameWindow('https://flipme.artfervour.com/');
        }}
      >
        Play Flip Me
      </button>
      <Spacer y={1} />

      <button
        className="finalButton"
        onClick={() => {
          linkHandleSameWindow('https://www.artfervour.com/af-games');
        }}
      >
        Play More Games
      </button>
      <Spacer y={3} />
      <Text p style={{ textAlign: 'center' }}>
        Did you like the crossword? Share it with your friends, so they can give
        it a shot!
      </Text>
      <Spacer y={2} />
      <Grid.Container justify="center" className="final-social-links">
        <Facebook
          // @ts-ignore
          onClick={() =>
            linkHandle(
              'https://www.facebook.com/sharer/sharer.php?u=https://crossword.artfervour.app/'
            )
          }
        />
        <Spacer inline x={1.4} />
        <MessageCircle
          // @ts-ignore
          onClick={() =>
            linkHandle('whatsapp://send?text=https://crossword.artfervour.app/')
          }
        />
      </Grid.Container>
    </Page>
  );
}

export default Finish;

// Styled-components

const Page = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const opacity = (val: number) => {
  return { opacity: val };
};

import "./App.scss";

import React from "react";
import styled from "styled-components";

import Logo from "../assets/img/logo.png";

import { Button, Grid, Text, Spacer } from "@zeit-ui/react";

import { Facebook, Instagram } from "@zeit-ui/react-icons";

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  return (
    <Page className="page">
      <img className="af-fullLogo" src={Logo} alt="Artfervour Logo" />
      <Spacer y={3} />
      <Text h3>Congrats you are AWESOME!</Text>
      <Spacer y={0.5} />
      <Text p style={opacity(0.85)}>
        Thank you for playing <b>AF CROSSWORD</b>
      </Text>
      <Spacer y={0.5} />
      <Text p style={opacity(0.6)}>
        Time Taken: 0
      </Text>
      <Spacer y={2} />
      <Button size="large" type="secondary" className="finalButton">
        Restart
      </Button>
      <Spacer y={0.5} />
      <Button size="large" type="secondary" className="finalButton">
        Play More Games
      </Button>
      <Spacer y={0.5} />
      <Button size="large" type="secondary" className="finalButton">
        Play Motion Brush
      </Button>
      <Spacer y={2} />
      <Text p style={textCenter}>
        Did you like the crossword? Share it with your friends, so they can give
        it a shot!
      </Text>
      <Spacer y={2} />
      <Grid.Container justify="center">
        <Facebook />
        <Spacer inline x={1.4} />
        <Instagram />
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

const textCenter = {
  textAlign: "center",
};

const opacity = (val) => {
  return { opacity: val };
};

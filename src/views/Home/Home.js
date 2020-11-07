import React from "react";
const { Grid } = require("semantic-ui-react");

const Home = () => {
  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <h2>Una web para anunciar app o eventos</h2>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Home;

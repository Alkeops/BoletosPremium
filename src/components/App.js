import { Grid } from "semantic-ui-react";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <Header>
        <h1>Hola! mundo cruel</h1>
      </Header>
      <Grid>
        <Grid.Column width={10}>
          <h2>Left Column</h2>
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Right Column</h2>
        </Grid.Column>
      </Grid>
    </>
  );
}
export default App;

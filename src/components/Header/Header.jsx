import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Grid } from "semantic-ui-react";

export default function PageHeader({ handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" >
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column textAlign={"left"} >
              <a href="https://store.steampowered.com/">
              <Image size="mini" src="https://imgur.com/rWNJtgC.png" />
              </a>
            </Grid.Column>
            <Grid.Column textAlign={"right"} >
              <Link to="" onClick={handleLogout}>
                Logout
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Header>
    </Segment>
  );
}

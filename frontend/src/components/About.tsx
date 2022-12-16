import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navigation from "./Navigation";
import "../styles/About.css";
import { teaminfo } from "./TeamInfo";
import { APIs } from "./APIs";
import { tools } from "./Tools";
import {
  Card as MaterialCard,
  CardContent,
  Typography,
  CardActionArea,
  // CardMedia,
} from "@mui/material";

type Member = {
  id: number;
  name: String;
  username: String;
  email: String;
  image: string;
  role: String;
  bio: String;
  commits: number;
  issues: number;
  tests: number;
};

type Commit = {
  email: String;
  commits: number;
};

type Issue = {
  closed_by: {
    username: String;
  };
};

export default class About extends React.Component {
  state = {
    team: [],
    commits: [],
    issues: [],
    total_commits: [],
    total_tests: 0,
  };

  componentDidMount() {
    axios
      .all([
        axios.get(
          "https://gitlab.com/api/v4/projects/33894026/issues?state=closed&per_page=100"
        ),
        axios.get(
          "https://gitlab.com/api/v4/projects/33894026/repository/contributors"
        ),
      ])
      .then(
        axios.spread((ob1, ob2) => {
          console.log(ob1);
          console.log(ob2);
          const team = teaminfo;
          const issues = ob1.data;
          const commits = ob2.data;
          this.setState({ team });
          this.setState({ issues });
          this.setState({ commits });
        })
      );
  }

  componentDidUpdate(_, prevState) {
    const { commits, team, issues } = this.state;
    if (prevState.commits.length === 0 && commits.length > 0) {
      let total_commits = 0;
      let total_tests = 0;
      team.forEach((member: Member) => {
        total_tests += member.tests;
      })
      // code to get commits and issues from Group 1 10 am last semester
      // link: https://gitlab.com/erogalla/mytechreview/-/blob/main/front-end/src/api/GitlabStats.tsx
      commits.forEach((commit: Commit) => {
        const email = commit.email;
        const num_commits = commit.commits;
        team.forEach((member: Member) => {
          if (member.email === email) {
            member.commits = num_commits;
            total_commits += num_commits;
          }
        });
      });
      this.setState({ total_commits });
      this.setState({ team });
      this.setState({total_tests});
    }

    if (prevState.issues.length === 0 && issues.length > 0) {
      issues.forEach((issue: Issue) => {
        if (issue.closed_by.username !== null) {
          const username = issue.closed_by.username;
          team.forEach((member: Member) => {
            if (member.username === username) {
              member.issues += 1;
            }
          });
        }
      });
      this.setState({ team });
    }
  }

  render() {
    if (this.state.commits.length === 0 || this.state.team.length === 0)
      return <div />;

    return (
      <div>
        <Navigation />
        <div className="center-text">
          <h1>About Page</h1>
          <p>
            This website shows users information about countries, disasters, and international organizations. The
            purpose of this website is to inform users on disasters going on in
            countries around the world and which charities are combatting them.
            This site's intended users are people who wished to be informed and
            alleviate diasters around the world.
          </p>
          <p>
            What's interesting is that most international charities tend to be
            everywhere! As a result, they tend to help out in many of the
            disasters that we have in our database.
          </p>
          <CardGroup className="card-margins">
            <Row xs={1} md={3} className="justify-content-md-center">
              {this.state.team.map((member: Member) => {
                return (
                  <Card key={member.id}>
                    <Card.Img variant="top" src={member.image} />
                    <Card.Body>
                      <Card.Title>{member.name}</Card.Title>
                      <Card.Text>Role: {member.role}</Card.Text>
                      <Card.Text>{member.bio}</Card.Text>
                      <Card.Text>Issues Closed: {member.issues}</Card.Text>
                      <Card.Text>Commits: {member.commits}</Card.Text>
                      <Card.Text>Tests Created: {member.tests} </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </CardGroup>
          <br />
          <h2>Total Stats</h2>
          <CardGroup className="card-margins">
            <Row xs={1} md={3} className="justify-content-md-center">
              <Card>
                <Card.Body>
                  <Card.Title>Commits</Card.Title>
                  <Card.Text>{this.state.total_commits}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Issues</Card.Title>
                  <Card.Text>{this.state.issues.length}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Tests</Card.Title>
                  <Card.Text>{this.state.total_tests}</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </CardGroup>
          <br />
          <h2>APIs</h2>
          <Container>
            <Row xs={1} md={3} className="justify-content-md-center">
            {APIs.map((api) => {
                return (
                  <a href={api.url}>
                  <Card key={api.id} className="toolCard">
                    <Card.Body>
                      <Card.Img
                        src={api.image}
                        alt={api.name}
                        variant="top"
                      />
                      <Card.Title>{api.name}</Card.Title>
                      <Card.Text>{api.reason}</Card.Text>
                    </Card.Body>
                  </Card>
                  </a>
                );
              })}
            </Row>
          </Container>

          <br></br>
          <h2>Other</h2>
          <div className="card-spacing">
            <MaterialCard variant="outlined" className="card">
              <CardActionArea href="https://documenter.getpostman.com/view/19742107/UVkqtFuX">
                <CardContent>
                  <Typography variant="h5">Postman Documentation</Typography>
                </CardContent>
              </CardActionArea>
            </MaterialCard>
            <MaterialCard variant="outlined" className="card">
              <CardActionArea href="https://gitlab.com/daniamir/sweproject">
                <CardContent>
                  <Typography variant="h5">Gitlab Repository</Typography>
                </CardContent>
              </CardActionArea>
            </MaterialCard>
          </div>
          <br />
          <br />
          <h2>Tools</h2>
          <Container>
            <Row xs={1} md={3} className="justify-content-md-center">
              {tools.map((tool) => {
                return (
                  <a href={tool.link}>
                  <Card key={tool.id} className="toolCard">
                    <Card.Body>
                      <Card.Img
                        src={tool.image}
                        alt={tool.name}
                        variant="top"
                      />
                      <Card.Title>{tool.name}</Card.Title>
                      <Card.Text>{tool.purpose}</Card.Text>
                    </Card.Body>
                  </Card>
                  </a>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

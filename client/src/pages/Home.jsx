import { Typography, Box, Container, Paper, Grid, ListItem, List, IconButton, ListItemText, ListSubheader, ListItemButton, Title, Link, Button } from "@mui/material";

import React from 'react'

import ClickableList from "../components/ClickableList";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth()

    const items =  [0, 1, 2, 3]
    return(
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                        <React.Fragment>
                            <Typography component="p" variant="h4">
                                Hello {user.username}
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                on 15 March, 2019
                            </Typography>

                        </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                        <React.Fragment>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Käyttäjä
                            </Typography>
                            <Typography component="p" variant="h4">
                                $3,024.00
                            </Typography>
                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                on 15 March, 2019
                            </Typography>
                            <div>
                                <Link color="primary" href="#" onClick={()=>console.log("hurraa")}>
                                View balance
                                </Link>
                            </div>
                        </React.Fragment>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ClickableList 
                        label="My maps"
                        items={items}
                    />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ClickableList 
                        label="Answered maps"
                        items={items}
                    />
                </Paper>
              </Grid>
            </Grid>
          </Container>

    )
}

export default Home;
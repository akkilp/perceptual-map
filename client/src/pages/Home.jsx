import { Typography, Box, Container, Paper, Grid, ListItem, List, IconButton, ListItemText } from "@mui/material";

import {cloneElement} from 'react'

function generate(element) {
    return [0, 1, 2].map((value) =>
      cloneElement(element, {
        key: value,
      }),
    );
  }
const Home = () => {
    return(
        <Container>
            <Paper sx={{padding:2}}>
                    <Typography variant="h4">
                        Answered maps
                    </Typography>
                    <List>
                    {generate(
                        <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                pöö
                            </IconButton>
                        }
                        >
                        <ListItemText
                            primary="Single-line item"
                            secondary={'Secondary text' }
                        />
                        </ListItem>,
                    )}
                    </List>
                </Paper>
        </Container>
    )
}

export default Home
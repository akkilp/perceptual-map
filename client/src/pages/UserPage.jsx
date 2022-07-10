import { Typography, Box, Container, Paper, Grid, ListItem, List, IconButton, ListItemText } from "@mui/material";

import {useContext, cloneElement} from 'react'
import { AuthenticationContext } from "../components/AuthenticationService";


function generate(element) {
    return [0, 1, 2].map((value) =>
      cloneElement(element, {
        key: value,
      }),
    );
  }

const UserPage = () => {

    const { user } = useContext(AuthenticationContext);

    if(!user) return
    
    return (
        <Container maxWidth="xl" alignItems="stretch" sx={{padding:2}}>
            <Box sx={{display: 'flex'}}>
                <Paper sx={{flexGrow:1, padding:4}}>
                    <Box>
                        <Typography variant="h2">
                            {user.username}
                        </Typography>
                        <Typography variant="body1">
                            25 maps 
                        </Typography>
                        <Typography variant="body1">
                            3 answers
                        </Typography>
                        <Typography variant="body1">
                            Joined x.x
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <Box>
                <Paper sx={{padding:2, marginBottom:2}}>
                    <Typography variant="h4">
                        Created maps
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
            </Box>

        </Container>

    )
}

export default UserPage;
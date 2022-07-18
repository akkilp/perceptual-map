import {
    Typography,
    Box,
    Container,
    Paper,
    Grid,
    ListItem,
    List,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Title,
    Link,
    Button,
} from '@mui/material'

import React from 'react'

import ClickableList from '../components/ClickableList'
import useAuth from '../hooks/useAuth'

import { fetchUserContent } from '../api_calls'
import Loading from '../components/Loading'
import makeAuthHeader from '../util/makeAuthHeader'
import useMessager from '../hooks/useMessager'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const Home = () => {
    const { user } = useAuth()
    const { setMessage } = useMessager()

    const navigate = useNavigate()

    const [loading, error, data] = useFetch(() =>
        fetchUserContent(user.id, makeAuthHeader(user.token))
    )

    if (loading) {
        return (
            <Container
                maxWidth="xl"
                sx={{
                    mt: 20,
                    mb: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Loading />
            </Container>
        )
    }

    if (error) {
        setMessage(error)
        return <div> Error occurred in fetching data</div>
    }

    const { admin, answers, maps, username } = data.data

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 230,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            sx={{ paddingBottom: 2 }}
                            component="p"
                            variant="h4"
                        >
                            Hello {username}{' '}
                            {admin && (
                                <span
                                    style={{
                                        color: 'green',
                                        fontSize: 20,
                                    }}
                                >
                                    admin user
                                </span>
                            )}
                        </Typography>
                        <Typography component="p" variant="body">
                            Dont know what to do? You can start by reading where{' '}
                            <Link href="https://en.wikipedia.org/wiki/Perceptual_mapping">
                                perceptual maps
                            </Link>{' '}
                            are used for.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 230,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            sx={{ width: 200, height: 50 }}
                            variant="contained"
                        >
                            Browse
                        </Button>
                        <Button
                            onClick={() => navigate('/maps/create')}
                            sx={{ width: 200, height: 50 }}
                            variant="contained"
                        >
                            Create new
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                    >
                        <ClickableList
                            label="My maps"
                            items={maps}
                            emptyLabel="You have not created maps yet."
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                    >
                        <ClickableList
                            label="Answered maps"
                            items={answers}
                            emptyLabel="You have not answered to maps yet."
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home

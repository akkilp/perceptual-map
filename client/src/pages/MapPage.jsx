import { useNavigate, useParams } from 'react-router-dom'
import { Container, Paper, Grid, Typography, Button } from '@mui/material'

import { useState } from 'react'
import { fetchMap } from '../api_calls'

import { useLocation } from 'react-router-dom'

import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'

import SubjectList from '../components/SubjectList'
import DimensionList from '../components/DimensionList'

import QRCode from 'react-qr-code'
import useMessager from '../hooks/useMessager'

const MapPage = () => {
    let { mapId } = useParams()
    const [loading, error, data] = useFetch(() => fetchMap(mapId))
    const navigate = useNavigate()

    const { displayMessage } = useMessager()

    if (loading)
        return (
            <Container
                sx={{
                    width: '100%',
                    mt: 20,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Loading />
            </Container>
        )
    if (error) {
        return (
            <Container
                sx={{
                    width: '100%',
                    mt: 20,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4">
                    Content you tried to reach does not exist
                </Typography>
            </Container>
        )
    }
    const {
        id,
        title,
        createdBy,
        description,
        answers,
        createdAt,
        dimensions,
        subjects,
    } = data.data

    const dateObject = new Date(createdAt.replace(' ', 'T'))

    const parsedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
    }/${dateObject.getFullYear()}`

    const copyToClipboard = (toCopy) => {
        const el = document.createElement(`textarea`)
        el.value = toCopy
        el.setAttribute(`readonly`, ``)
        el.style.position = `absolute`
        el.style.left = `-9999px`
        document.body.appendChild(el)
        el.select()
        document.execCommand(`copy`)
        document.body.removeChild(el)
    }

    const answerUrl = `${window.location.href}/answer`

    return (
        <Container maxWidth="lg" sx={{ my: 4, mt: 10 }}>
            <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Typography variant="h4">{title}</Typography>
                            <Typography>
                                Created by{' '}
                                <span
                                    style={{
                                        fontWeight: 500,
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                        navigate(`/users/${createdBy.id}`)
                                    }
                                >
                                    {createdBy.username}
                                </span>
                                {` `}
                                {parsedDate}
                            </Typography>
                            <Typography>{description}</Typography>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>Answered</Typography>
                            <Typography variant="h4" component="p">
                                {answers.length}
                            </Typography>
                            <Typography>times</Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid
                    item
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                    md={8}
                    xs={12}
                >
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            p: 4,
                            gap: 4,
                        }}
                    >
                        <Button
                            fullWidth
                            size="large"
                            variant="outlined"
                            onClick={() => navigate(`/maps/${id}/answer`)}
                        >
                            Answer
                        </Button>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            onClick={() => navigate(`/maps/${id}/view`)}
                        >
                            View
                        </Button>
                    </Paper>
                    <Paper
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexGrow: 1,
                        }}
                    >
                        <Button
                            onClick={() => {
                                copyToClipboard(answerUrl)
                                displayMessage('Link copied!', 'success')
                            }}
                        >
                            {answerUrl}
                        </Button>
                    </Paper>
                </Grid>

                <Grid item md={4} xs={12}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            py: 4,
                        }}
                    >
                        <QRCode value={answerUrl} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <DimensionList dimensions={dimensions} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            pb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <SubjectList subjects={subjects} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MapPage

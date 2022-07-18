import { useNavigate, useParams } from 'react-router-dom'
import { Container, Paper, Typography } from '@mui/material'

import { useState } from 'react'
import { fetchMap } from '../api_calls'

import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'

import SubjectList from '../components/SubjectList'
import DimensionList from '../components/DimensionList'

const MapPage = () => {
    let { mapId } = useParams()
    const [loading, error, data] = useFetch(() => fetchMap(mapId))

    const [createNew, setCreateNew] = useState(false)

    const navigate = useNavigate()

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
    if (error & !loading)
        return <h2>Error occurred: {error.status + error.message}</h2>

    const { title, createdBy, description, answers, createdAt, dimensions } =
        data.data

    const dateObject = new Date(createdAt.replace(' ', 'T'))

    const parsedDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
    }/${dateObject.getFullYear()}`

    let subjects = [
        { id: 1, name: 'McDonals', color: '#ff0000' },
        { id: 2, name: 'Hesburger', color: '#AA4A44' },
        { id: 3, name: 'Burger King', color: '#EE4B2B' },
    ]

    return (
        <Container
            sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
        >
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
                            onClick={() => navigate(`/users/${createdBy.id}`)}
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
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DimensionList dimensions={dimensions} />
            </Paper>

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
        </Container>
    )
}

export default MapPage

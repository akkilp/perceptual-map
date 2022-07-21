import { useState } from 'react'
import { Container, Button, Typography, Box } from '@mui/material'

import TwoDimensionalMap from '../components/TwoDimensionalMap'

import { fetchMap } from '../api_calls'
import useFetch from '../hooks/useFetch'

import { useParams } from 'react-router-dom'

import Loading from '../components/Loading'
import mergeDataFor2D from '../util/mergeDataFor2D'

let d = [
    { x: 1.5, y: 3, name: 'hesburger' },
    { x: 3.2, y: 2.2, name: 'hesburger' },
    { x: 4, y: 5, name: 'hesburger' },
    { x: 1.2, y: 2, name: 'mcdonalds' },
    { x: 1.2, y: 4, name: 'mcdonalds' },
    { x: 4, y: 1.5, name: 'mcdonalds' },
    { x: 4, y: 1.5, name: 'mcdonalds' },
    { x: 3, y: 1.7, name: 'burger king' },
]

const View = () => {
    let { mapId } = useParams()
    const [loading, error, data] = useFetch(() => fetchMap(mapId))
    const [showAverage, setShowAverages] = useState(true)

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

    const { answers, subjects, dimensions } = data.data

    const parsedAnswers = mergeDataFor2D(answers, subjects, dimensions)
    const labels = dimensions.map((dimension) => dimension.name)

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TwoDimensionalMap
                    labelNames={labels}
                    data={parsedAnswers}
                    showAverage={showAverage}
                />
                <Button
                    variant="contained"
                    onClick={() => setShowAverages(!showAverage)}
                >
                    {showAverage ? 'show all' : 'show averages'}
                </Button>
            </Box>
        </Container>
    )
}

export default View

import React, { useState } from 'react'
import {
    Container,
    Button,
    Typography,
    Box,
    ListSubheader,
} from '@mui/material'

import Checkbox from '@mui/material/Checkbox'

import TwoDimensionalMap from '../components/TwoDimensionalMap'

import { fetchMap } from '../api_calls'
import useFetch from '../hooks/useFetch'

import { useParams } from 'react-router-dom'

import Loading from '../components/Loading'
import mergeDataFor2D from '../util/mergeDataFor2D'
import SelectFromItems from '../components/SelectFromItems'

import Drawer from '@mui/material/Drawer'

import Toolbar from '@mui/material/Toolbar'

import Divider from '@mui/material/Divider'

import SelectList from '../components/SelectList'

import VisualizationSelector from '../components/VisualizationSelector'

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

const drawerWidth = 300

const View = () => {
    let { mapId } = useParams()
    const [loading, error, data] = useFetch(() => fetchMap(mapId))

    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [selectedDimensions, setSelectedDimensions] = useState([])

    const [visualization, setVisualization] = useState(null)

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

    const filteredSubjects =
        selectedSubjects.length === 0
            ? []
            : subjects.filter((sub) => selectedSubjects.includes(sub.id))

    const filteredDimensions =
        selectedDimensions.length === 0
            ? []
            : dimensions.filter((dim) => selectedDimensions.includes(dim.id))

    const filteredAnswers = answers.filter(
        (ans) =>
            selectedDimensions.includes(ans.dimension_id) &&
            selectedSubjects.includes(ans.subject_id)
    )

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 10,
                    ml: '300px',
                }}
            >
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Box sx={{ p: 2 }}>
                        <SelectFromItems
                            handleSelect={(v) => setVisualization(v)}
                        />
                    </Box>
                    <Divider />

                    <SelectList
                        label="Select dimensions"
                        items={dimensions}
                        handleSelect={(v) => setSelectedDimensions(v)}
                    />
                    <Divider />
                    <SelectList
                        label="Select subjects"
                        items={subjects}
                        handleSelect={(v) => setSelectedSubjects(v)}
                    />
                </Drawer>
                <VisualizationSelector
                    visualization={visualization}
                    answers={filteredAnswers}
                    dimensions={filteredDimensions}
                    subjects={filteredSubjects}
                />
            </Box>
        </Container>
    )
}

export default View

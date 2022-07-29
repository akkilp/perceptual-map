import { Box, Button } from '@mui/material'
import TwoDimensionalMap from './TwoDimensionalMap'
import { useState } from 'react'

import mergeDataFor2D from '../util/mergeDataFor2D'
const PerceptualMap = ({ answers, subjects, dimensions }) => {
    const [showAverage, setShowAverages] = useState(true)

    if (dimensions.length > 2 || dimensions.length < 2)
        return <div>Select 2 dimensions for perceptual map</div>

    if (subjects && subjects.length <= 0) {
        return <div>Select atleast one subject</div>
    }

    const getLabels = (dims) => dims.map((dimension) => dimension.name)

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                p: 4,
                maxWidth: 800,

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <TwoDimensionalMap
                labelNames={getLabels(dimensions)}
                data={mergeDataFor2D(answers, subjects)}
                showAverage={showAverage}
            />
            <Button
                variant="outlined"
                onClick={() => setShowAverages(!showAverage)}
                sx={{ minWidth: 300, transform: 'translateX(20px)' }}
            >
                {showAverage ? 'show all' : 'show averages'}
            </Button>
        </Box>
    )
}

export default PerceptualMap

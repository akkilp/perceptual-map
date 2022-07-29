import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function SelectFromItems({ handleSelect }) {
    const [visualization, setVisualization] = React.useState('')

    const handleChange = (event) => {
        setVisualization(event.target.value)
        handleSelect(event.target.value)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="visualization">Select visualization</InputLabel>
                <Select
                    labelId="visualization"
                    id="visualization"
                    value={visualization}
                    label="Select visualization"
                    onChange={handleChange}
                >
                    <MenuItem value="histogram">1D histogram</MenuItem>
                    <MenuItem value="perceptualMap">2D perceptual map</MenuItem>
                    <MenuItem value="radar">Multi dimensional radar</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

import React, { PureComponent } from 'react'
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from 'recharts'

import { Box, Typography, Paper } from '@mui/material'

import histogramAdaptor from '../util/histrogramAdaptor'

import * as d3 from 'd3-array'
const _ = require('lodash')

const Histogram = ({ answers, dimensions, subjects }) => {
    if (dimensions && dimensions.length <= 0) {
        return <div>Select atleast one dimension</div>
    }

    if (subjects && subjects.length <= 0) {
        return <div>Select atleast one subject</div>
    }

    // Modifies data queried from db to being suitable for visualization
    const data = histogramAdaptor(answers, dimensions, subjects)

    return (
        <Box sx={{ width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 16,
                    alignItems: 'center',
                }}
            >
                {data.map((subGroup) => {
                    const subjectLabel =
                        Object.values(subGroup)[0][0].subjectName

                    return (
                        <Paper
                            sx={{
                                padding: 4,
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'relative',
                            }}
                        >
                            <Typography
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    top: '-10px',
                                    left: 0,
                                    transform: 'rotate(-90deg)',
                                }}
                            >
                                {subjectLabel}
                            </Typography>
                            {Object.values(subGroup).map((dimGroup) => {
                                const histogram = d3
                                    .bin()
                                    .value(function (d) {
                                        return d.answer
                                    })
                                    .domain([1, 5])
                                    .thresholds(5 * 2)

                                const binnedAnswers = histogram(dimGroup).map(
                                    (ans) => {
                                        return {
                                            binLabel: `${ans.x0}-${ans.x1}`,
                                            frequency:
                                                (ans.length / dimGroup.length) *
                                                100,
                                        }
                                    }
                                )
                                const { dimensionName, color } =
                                    Object.values(dimGroup)[0]

                                return (
                                    <ResponsiveContainer
                                        width={350}
                                        height={300}
                                    >
                                        <BarChart
                                            data={binnedAnswers}
                                            margin={{
                                                top: 30,
                                                right: 5,
                                                bottom: 5,
                                                left: 5,
                                            }}
                                        >
                                            <XAxis
                                                key={Math.random()}
                                                dataKey="binLabel"
                                                angle={-35}
                                                dy={8}
                                                interval={0}
                                            >
                                                <Label
                                                    value={dimensionName}
                                                    offset={250}
                                                    position="top"
                                                />
                                            </XAxis>
                                            <YAxis
                                                key={Math.random()}
                                                tickFormatter={(tick) => {
                                                    return `${tick}%`
                                                }}
                                                domain={[0, 100]}
                                            />
                                            <Bar
                                                dataKey="frequency"
                                                fill={color}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )
                            })}
                        </Paper>
                    )
                })}
            </div>
        </Box>
    )
}

export default Histogram

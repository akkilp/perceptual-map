import React from 'react'
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ResponsiveContainer,
    ZAxis,
} from 'recharts'
const _ = require('lodash')

let d = [
    { x: 1.5, y: 3, subject: 'hesburger', color: '#0000FF' },
    { x: 3.2, y: 2.2, subject: 'hesburger', color: '#0000FF' },
    { x: 4, y: 5, subject: 'hesburger', color: '#0000FF' },
    { x: 1.2, y: 2, subject: 'mcdonalds', color: '#9900FF' },
    { x: 1.2, y: 4, subject: 'mcdonalds', color: '#9900FF' },
    { x: 4, y: 1.5, subject: 'mcdonalds', color: '#9900FF' },
    { x: 4, y: 1.5, subject: 'mcdonalds', color: '#9900FF' },
    { x: 3, y: 1.7, subject: 'burger king', color: '#FF6622' },
]

function TwoDimensionalMap({
    showAverage,
    data = d,
    labelNames = ['Price', 'Quality'],
}) {
    const groupedData = _.groupBy(data, (item) => item.subject)
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload) {
            const { x, y, subject } = payload[0].payload

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        padding: 15,
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '16px',
                        boxShadow: ' 0 2px 5px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(8.4px)',
                    }}
                >
                    <div
                        style={{
                            textTransform: 'capitalize',
                            fontWeight: 500,
                        }}
                    >
                        {subject}
                    </div>
                    <div>
                        {payload[0].name}
                        {`: `}
                        {x}
                    </div>
                    <div>
                        {payload[1].name}
                        {`: `}
                        {y}
                    </div>
                </div>
            )
        }
    }

    return (
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
            <ScatterChart
                margin={{
                    top: 0,
                    right: 20,
                    left: 0,
                    bottom: 20,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type="number"
                    dataKey="x"
                    name={labelNames[0]}
                    tickCount={5}
                    domain={[1, 5]}
                >
                    <Label
                        value={labelNames[0]}
                        offset={-8}
                        position="insideBottom"
                    />
                </XAxis>
                <YAxis
                    type="number"
                    dataKey="y"
                    name={labelNames[1]}
                    tickCount={5}
                    domain={[1, 5]}
                >
                    <Label
                        value={labelNames[1]}
                        offset={20}
                        position="center"
                        angle={-90}
                    />
                </YAxis>
                {showAverage && <ZAxis range={[2000, 2000]} />}
                <Tooltip content={<CustomTooltip />} />

                {/* Creates different scatters based on groups */}
                {Object.values(groupedData).map((group) => {
                    let data
                    if (showAverage) {
                        const meansX = _.meanBy(group, (o) => o.x)
                        const meansY = _.meanBy(group, (o) => o.y)
                        data = [
                            {
                                x: meansX.toFixed(2),
                                y: meansY.toFixed(2),
                                subject: group[0].subject,
                                color: group[0].color,
                            },
                        ]
                    } else {
                        data = group
                    }

                    return (
                        <Scatter
                            key={data.name}
                            name={data.name}
                            data={data}
                            fill={group[0].color}
                            shape={showAverage ? 'circle' : 'cross'}
                            isAnimationActive={false}
                        />
                    )
                })}
            </ScatterChart>
        </ResponsiveContainer>
    )
}

export default TwoDimensionalMap

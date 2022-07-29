import React, { PureComponent } from 'react'

import { Box } from '@mui/system'
import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

const _ = require('lodash')

const d = [
    {
        subject: 'Laatu',
        mcdonalds: 2,
        hesburger: 2.5,
        aune: 5,
        burgerking: 3,
        fullMark: 4,
        color: 'red',
    },
    {
        subject: 'Bang per buck',
        mcdonalds: 4,
        hesburger: 3.5,
        aune: 4,
        burgerking: 2,
        fullMark: 4,
        color: 'blue',
    },
    {
        subject: 'Hinta',
        mcdonalds: 4,
        hesburger: 3.5,
        aune: 2,
        burgerking: 3,
        fullMark: 4,
        color: 'yellow',
    },
    {
        subject: 'Maku',
        mcdonalds: 3,
        hesburger: 3,
        aune: 5,
        burgerking: 3.5,
        fullMark: 4,
        color: 'pink',
    },
]

const MultiRadar = ({ answers, dimensions, subjects }) => {
    const buildDataForRadar = (answers, dimensions, subjects) => {
        const merged = answers
            .map((ans) => {
                const targetDim = dimensions.find(
                    (dim) => dim.id === ans.dimension_id
                )
                return { ...ans, ...targetDim, dimensionName: targetDim.name }
            })
            .map((a) => {
                const targetSubject = subjects.find(
                    (sub) => sub.id === a.subject_id
                )
                return {
                    ...a,
                    ...targetSubject,
                    subjectName: targetSubject.name,
                }
            })

        const groupedByDimension = _.values(
            _.groupBy(merged, (s) => s.dimensionName)
        )

        const dimensionsGroupedBySubject = _.values(
            groupedByDimension.map((g) => _.groupBy(g, (i) => i.subject_id))
        )

        const dimensionsGroupedBySubjectWithMeans =
            dimensionsGroupedBySubject.map((dimGroups) =>
                Object.values(dimGroups).map((g) => {
                    const gm = _.meanBy(g, function (o) {
                        return parseFloat(o.answer)
                    })
                    const dataObj = {
                        ...g[0],
                        mean: gm,
                    }
                    return dataObj
                })
            )

        const results = dimensionsGroupedBySubjectWithMeans.reduce(
            (tot, cur) => {
                const { dimensionName, maxValue, color } = cur[0]
                let newObj = {
                    dimension: dimensionName,
                    fullMark: maxValue,
                    color: color,
                }
                cur.forEach((x) => {
                    newObj[x.subjectName] = parseFloat(x.mean).toFixed(2)
                })
                return tot.concat(newObj)
            },
            []
        )
        return results
    }

    if (dimensions.length < 3) {
        return <div> You have to select atleast three dimensions for radar</div>
    }

    if (subjects && subjects.length <= 0) {
        return <div>Select atleast one subject</div>
    }

    const data = buildDataForRadar(answers, dimensions, subjects)

    return (
        <ResponsiveContainer width="70%" aspect={1}>
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" domain={[0, 5]} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Tooltip />
                {subjects.map((sub) => {
                    return (
                        <Radar
                            key={sub.id}
                            name={sub.name}
                            dataKey={sub.name}
                            stroke={sub.color}
                            fill={sub.color}
                            fillOpacity={0.3}
                            isAnimationActive={false}
                        />
                    )
                })}
                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    )
}

export default MultiRadar

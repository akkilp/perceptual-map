const _ = require('lodash')

const answers = [
    { user_id: 1, dimension_id: 17, answer: '3.6', subject_id: 25 },
    { user_id: 1, dimension_id: 17, answer: '4.2', subject_id: 25 },
    { user_id: 1, dimension_id: 18, answer: '2.2', subject_id: 25 },
    { user_id: 1, dimension_id: 18, answer: '2.5', subject_id: 25 },

    { user_id: 1, dimension_id: 17, answer: '4.7', subject_id: 26 },
    { user_id: 1, dimension_id: 17, answer: '2.1', subject_id: 26 },
    { user_id: 1, dimension_id: 18, answer: '1.7', subject_id: 26 },
    { user_id: 1, dimension_id: 18, answer: '1.2', subject_id: 26 },

    { user_id: 1, dimension_id: 17, answer: '5', subject_id: 27 },
    { user_id: 1, dimension_id: 17, answer: '4.1', subject_id: 27 },
    { user_id: 1, dimension_id: 18, answer: '4.5', subject_id: 27 },
    { user_id: 1, dimension_id: 18, answer: '4.8', subject_id: 27 },
]

const mergeDataFor2D = (answers, subjects) => {
    const groupedBySubject = _.groupBy(answers, (item) => item.subject_id)
    // Function that parses rows based on the dimension value to X and Y coordinates
    function createXY(answers) {
        let existing = []

        let hits = [[], []]

        answers.map((item) => {
            const dimId = item.dimension_id
            if (!existing.includes(dimId)) {
                existing.push(dimId)
                if (existing.length > 2) {
                    console.log('There are too many dimensions')
                    return false
                }
            }
            const index = existing.indexOf(dimId)
            hits[index].push(item.answer)
        })
        return hits
    }

    // Group distint subjects, get X and Y from dimensions, return array of objects that is fit for rechart.js
    const scatterPlotInput = []
    Object.values(groupedBySubject).map((group) => {
        const set = createXY(group)

        set.forEach((_, i) => {
            const inputObject = {
                x: parseFloat(set[0][i]),
                y: parseFloat(set[1][i]),
                subject: group[0].subject_id,
            }
            scatterPlotInput.push(inputObject)
        })
    })

    const mergeArrays = (arr1 = [], arr2 = []) => {
        let res = []
        res = arr1.map((obj) => {
            const index = arr2.findIndex((el) => el.id === obj.subject)
            const { name, color } = index !== -1 ? arr2[index] : {}
            return {
                ...obj,
                subject: name,
                color: color,
            }
        })
        return res
    }

    const scatterPlotsMergedWithData = mergeArrays(scatterPlotInput, subjects)

    return scatterPlotsMergedWithData
}

export default mergeDataFor2D

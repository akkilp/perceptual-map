const _ = require('lodash')

const histogramAdaptor = (answers, dimensions, subjects) => {
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
            return { ...a, ...targetSubject, subjectName: targetSubject.name }
        })

    const groupedBySubject = _.groupBy(merged, (s) => s.subjectName)

    const subjectsGroupedByDimension = Object.values(groupedBySubject).map(
        (g) => _.groupBy(g, (i) => i.dimension_id)
    )
    return subjectsGroupedByDimension
}

export default histogramAdaptor

import PerceptualMap from './PerceptualMap'
import MultiRadar from './MultiRadar'
import Histogram from './Histogram'

const VisualizationSelector = ({
    visualization,
    answers,
    dimensions,
    subjects,
}) => {
    switch (visualization) {
        case 'perceptualMap':
            return (
                <PerceptualMap
                    answers={answers}
                    dimensions={dimensions}
                    subjects={subjects}
                />
            )

        case 'histogram':
            return (
                <Histogram
                    answers={answers}
                    dimensions={dimensions}
                    subjects={subjects}
                />
            )
        case 'radar':
            return (
                <MultiRadar
                    answers={answers}
                    dimensions={dimensions}
                    subjects={subjects}
                />
            )
        default:
            return
    }
}

export default VisualizationSelector

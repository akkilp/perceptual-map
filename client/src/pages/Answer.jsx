import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    IconButton,
    LinearProgress,
    Slider,
    Divider,
    List,
    ListItemButton,
    ListItem,
    ListItemText,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

import { AnimatePresence, motion } from 'framer-motion'

import Loading from '../components/Loading'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSubmit } from '../hooks/useSubmit'
import useFetch from '../hooks/useFetch'
import useAuth from '../hooks/useAuth'
import useMessager from '../hooks/useMessager'

import { fetchMap } from '../api_calls'
import { sendAnswer } from '../api_calls'

const FinishSlide = ({ keys, questions, answers, navigateTo }) => {
    const { mapId } = useParams()
    const { displayMessage } = useMessager()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [handleApiSubmit, loading, error, response] = useSubmit(sendAnswer)

    const isAnswered = Object.keys(answers).length > 0

    useEffect(() => {
        if (response) {
            displayMessage(response.statusText, 'success')
            navigate(`/maps/${mapId}/view`)
        } else if (error) {
            displayMessage(error.message, 'error')
        }
    }, [response, loading, error])

    const prepareData = (answers) => {
        if (!isAnswered) {
            displayMessage('You are trying to send an empty request')
        }
        const payload = Object.values(answers).map((answer) => {
            const answerObject = {
                dimensionId: answer.dimId,
                subjectId: answer.subjectId,
                answer: answer.value,
                userId: user.id ? user.id : -1,
            }
            return answerObject
        })
        return payload
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                padding: 4,
            }}
        >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ fontWeight: 500 }}>
                            <TableCell>Dimension</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell align="right">Answer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question, i) => {
                            const answerValue =
                                isAnswered && answers[i] && answers[i].value
                                    ? answers[i].value
                                    : 'Not answered'
                            return (
                                <TableRow
                                    key={keys[i + 1]}
                                    hover
                                    onClick={() => navigateTo(i + 1)}
                                >
                                    <TableCell component="th" scope="row">
                                        {question.dimension.name}
                                    </TableCell>
                                    <TableCell>
                                        {question.subject.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {answerValue}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <Button
                    sx={{ m: 2, width: 200, float: 'right' }}
                    variant="contained"
                    onClick={() => handleApiSubmit(prepareData(answers), mapId)}
                >
                    Send
                </Button>
            </TableContainer>
        </Container>
    )
}

const FirstSlide = ({ title, description, onClick }) => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                textAlign: 'center',
                mt: '10%',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    maxWidth: 400,
                }}
            >
                You are entering into a survey where you are asked to estimate
                how you perceive specific subjects. In this survey you are being
                asked to give estimation of
            </Typography>
            <Typography
                sx={{
                    maxWidth: 400,
                }}
                color="primary"
                variant="h4"
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    maxWidth: 400,
                }}
                variant="h6"
            >
                {description}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    maxWidth: 400,
                }}
            >
                After you have finished, you can compare your results to
                estimations of others.
            </Typography>
            <Button variant="contained" onClick={onClick}>
                Start survey
            </Button>
        </Box>
    )
}

const NavigationButtons = ({ navigateForward, navigation, navigateBack }) => {
    return (
        <>
            <IconButton onClick={navigateBack}>
                <KeyboardArrowLeftIcon
                    fontSize="large"
                    sx={{ fill: 'black' }}
                />
            </IconButton>
            {navigation}
            <IconButton onClick={navigateForward}>
                <KeyboardArrowRightIcon
                    fontSize="large"
                    sx={{ fill: 'black' }}
                />
            </IconButton>
        </>
    )
}

const QuestionItem = ({ dimension, subject, onAnswer }) => {
    const averageValue = (dimension.minValue + dimension.maxValue) / 2
    const [value, setValue] = useState(averageValue)

    const handleChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }
    return (
        <Box
            sx={{
                p: 2,
                width: '100%',
                mt: '15%',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                textAlign: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4">How would you estimate </Typography>
            <Typography variant="h3" sx={{ color: subject.color }}>
                {subject.name}
            </Typography>
            <Typography variant="h4">in the dimension of </Typography>
            <Typography variant="h3" color="primary">
                {dimension.name}
            </Typography>
            <Slider
                sx={{ flexGrow: 1, maxWidth: 600 }}
                aria-label={dimension.name}
                valueLabelDisplay="auto"
                step={
                    dimension.valueType === 'integer'
                        ? 0.5
                        : dimension.valueType === 'float'
                        ? 0.1
                        : null
                }
                min={dimension.minValue}
                max={dimension.maxValue}
                value={value}
                onChange={handleChange}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    width: '100%',
                    maxWidth: 600,
                }}
            >
                <Typography>Very low</Typography>
                <Typography>Very high</Typography>
            </Box>
            <Button
                sx={{ width: 200 }}
                variant="contained"
                onClick={() => onAnswer(dimension.id, subject.id, value)}
            >
                Select
            </Button>
        </Box>
    )
}

const Answer = () => {
    let { mapId } = useParams()
    const [loading, error, data] = useFetch(() => fetchMap(mapId))

    const [navigation, setNavigation] = useState(0)

    const [answers, setAnswers] = useState({})

    const onAnswer = (dimId, subjectId, answer) => {
        const existingRemoved = Object.keys(answers)
            .filter((key) => parseInt(key) !== navigation)
            .reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: answers[key],
                })
            }, {})

        setAnswers({
            ...existingRemoved,
            [navigation - 1]: {
                dimId: dimId,
                subjectId: subjectId,
                value: answer,
            },
        })

        setNavigation((navigation) => navigation + 1)
    }

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
                    Something went wrong in fetching the survey.
                </Typography>
            </Container>
        )
    }

    const { subjects, dimensions, title, description } = data.data

    const createQuestionArr = (dimensions, subjects) => {
        let questions = []
        for (let i = 0; i < dimensions.length; i++) {
            for (let x = 0; x < subjects.length; x++) {
                questions.push({
                    dimension: { ...dimensions[i] },
                    subject: { ...subjects[x] },
                })
            }
        }
        return questions
    }

    const createQuestionComponents = (questions) => {
        let componentArray = questions.map((question) => (
            <QuestionItem
                dimension={question.dimension}
                subject={question.subject}
                onAnswer={onAnswer}
            />
        ))
        return componentArray
    }

    const buildDeck = (dimensions, subjects, entry) => {
        const questionArr = createQuestionArr(dimensions, subjects)
        const deck = createQuestionComponents(questionArr)

        if (entry) {
            deck.unshift(
                <FirstSlide
                    onClick={() =>
                        setNavigation((navigation) => navigation + 1)
                    }
                    description={entry.description}
                    title={entry.title}
                />
            )
        }
        const temp = {}
        deck.push(temp)
        const keys = Object.keys(deck)
        deck.pop()
        deck.push(
            <FinishSlide
                keys={keys}
                questions={questionArr}
                answers={answers}
                navigateTo={(i) => setNavigation(i)}
            />
        )
        return [keys, deck]
    }

    const [deckKeys, deck] = buildDeck(dimensions, subjects, {
        title,
        description,
    })

    const deckLength = deck.length - 1
    const progression = (navigation / deckLength) * 100

    return (
        <Container maxWidth="lg">
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: `calc(100vh - ${4 * 8}px)`,
                    my: 2,
                }}
            >
                <LinearProgress variant="determinate" value={progression} />
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={deckKeys[navigation]}
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            height: '100%',
                            flexGrow: 1,
                            overflow: 'scroll',
                        }}
                    >
                        {deck[navigation]}
                    </motion.div>
                </AnimatePresence>
                <Box sx={{ display: 'flex', alignSelf: 'end' }}>
                    <NavigationButtons
                        navigateBack={() => {
                            navigation > 0 &&
                                setNavigation((navigation) => navigation - 1)
                        }}
                        navigateForward={() => {
                            navigation < deckLength &&
                                setNavigation((navigation) => navigation + 1)
                        }}
                        navigation={navigation}
                    />
                </Box>
            </Paper>
        </Container>
    )
}

export default Answer

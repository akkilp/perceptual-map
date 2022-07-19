import {
    Typography,
    Box,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Button,
    Divider,
    TextField,
    Fab,
    ButtonGroup,
} from '@mui/material'

import React from 'react'

import ColorPicker from './ColorPicker'

import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { v4 as uuid } from 'uuid'

import EditButtons from './EditButtons'
import { createSubject, deleteSubject, updateSubject } from '../api_calls'

import { useParams } from 'react-router-dom'

import { useSubmit } from '../hooks/useSubmit'
import useMessager from '../hooks/useMessager'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { useEffect } from 'react'

const SubjectList = ({
    subjects,
    title = 'Subjects',
    emptyLabel = 'There exists no subjects',
}) => {
    const [items, setItems] = React.useState(subjects)
    const [showNew, setShowNew] = React.useState(false)
    const [editing, setEditing] = React.useState(null)

    const { displayMessage } = useMessager()

    const [handleApiSubmit, loading, error, response] =
        useSubmit(/* deleteSubject */)

    const { mapId } = useParams()

    React.useEffect(() => {
        if (response) {
            const message = 'Subject deleted'
            displayMessage(message, 'success')
            const idFromUrl = response.config.url.split('/').pop()
            deleteItem(parseInt(idFromUrl))
        } else if (error) {
            displayMessage(error.message, 'error')
        }
    }, [loading, error, response])

    const deleteItem = (id) => {
        const updatedItems = items.filter((item) => item.id !== id)
        setItems(updatedItems)
    }

    const addToList = (newItem) => {
        const itemsWithNew = items.concat(newItem)
        setItems(itemsWithNew)
        setShowNew(null)
    }

    const updateItems = (updatedItem) => {
        const updatedItems = items.map((item) =>
            item.id === updatedItem.id ? { ...updatedItem } : item
        )
        setItems(updatedItems)
        setEditing(null)
    }

    const isEmpty = items.length <= 0

    // Render a list with two edit buttons
    // Conditionally expose either EditSubject when edit is on, or databar if edit is not selected
    const renderList = items.map((item) => {
        return (
            <div key={item.id}>
                <ListItem
                    secondaryAction={
                        <EditButtons
                            hide={editing || showNew}
                            onEdit={() => {
                                setEditing(item.id)
                            }}
                            onDelete={() => handleApiSubmit(item.id, mapId)}
                        />
                    }
                >
                    {editing && editing === item.id ? (
                        <EditSubject
                            data={item}
                            closeEditor={() => setEditing(null)}
                            editing={true}
                            handleUpdate={updateItems}
                        />
                    ) : (
                        <DataBar item={item} />
                    )}
                </ListItem>
                <Divider />
            </div>
        )
    })

    return (
        <>
            <List
                sx={{ py: 3 }}
                subheader={
                    <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                    >
                        {title}
                    </Typography>
                }
            >
                {isEmpty ? <Typography>{emptyLabel}</Typography> : renderList}
            </List>
            {showNew ? (
                <EditSubject
                    closeEditor={() => setShowNew(null)}
                    editing={false}
                    handleUpdate={addToList}
                />
            ) : !editing ? (
                <Button
                    variant="contained"
                    sx={{ alignSelf: 'end' }}
                    onClick={() => setShowNew(true)}
                >
                    Create new
                </Button>
            ) : null}
        </>
    )
}
export default SubjectList

const validationSchema = yup.object({
    name: yup.string().min(3).required('Name of dimension is required'),
    color: yup.string().required('Color is required'),
})

const EditSubject = ({ data, editing, handleUpdate, closeEditor }) => {
    const [handleApiSubmit, loading, error, response] = useSubmit(
        editing ? updateSubject : createSubject
    )

    const newItem = {
        id: uuid(),
        name: '',
        color: '#ff0000',
    }

    const existingItem = (data) => {
        return {
            id: data.id,
            name: data.name,
            color: data.color,
        }
    }

    const { displayMessage } = useMessager()

    const { mapId } = useParams()

    const formik = useFormik({
        initialValues: data ? existingItem(data) : newItem,
        validationSchema: validationSchema,
        onSubmit: (payload) => {
            handleApiSubmit(payload, mapId)
        },
    })

    useEffect(() => {
        if (response) {
            const message = `${
                editing ? 'Updated' : 'Created'
            } subject succesfully.`
            displayMessage(message, 'success')
            handleUpdate(response.data)
        } else if (error) {
            displayMessage(error.message, 'error')
        }
    }, [loading, error, response])

    const updateColor = (col) => {
        formik.setFieldValue('color', col.hex)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        p: 2,
                    }}
                >
                    <IconButton sx={{ mr: 2 }} onClick={closeEditor}>
                        <CloseIcon />
                    </IconButton>
                    <ColorPicker
                        initColor={formik.values.color}
                        updateChange={updateColor}
                    />
                    <TextField
                        sx={{ width: 400 }}
                        id="name"
                        name="name"
                        label="Name"
                        type="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                    >
                        Name
                    </TextField>
                </div>

                <Fab
                    color="primary"
                    aria-label="add"
                    type="submit"
                    size="medium"
                    disabled={loading}
                >
                    <CheckIcon />
                </Fab>
            </Box>
        </form>
    )
}

const DataBar = ({ item }) => {
    return (
        <>
            <div
                style={{
                    backgroundColor: item.color.hex || item.color,
                    height: 30,
                    width: 30,
                    borderRadius: '50%',
                    marginRight: 10,
                }}
            />
            <ListItemText
                primary={item.name}
                sx={{ textTransform: 'capitalize' }}
            />
        </>
    )
}

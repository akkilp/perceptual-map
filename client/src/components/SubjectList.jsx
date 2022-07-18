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

const SubjectList = ({
    subjects,
    title = 'Subjects',
    emptyLabel = 'There exists no subjects',
}) => {
    const [items, setItems] = React.useState(subjects)
    const [showNew, setShowNew] = React.useState(false)
    const [newName, setNewName] = React.useState('')
    const [editing, setEditing] = React.useState(null)

    const handleColorChange = (id, color) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, color: color } : item
        )
        setItems(updatedItems)
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((item) => item.id !== id)
        setItems(updatedItems)
    }

    const createNew = () => {
        const newItem = { id: uuid(), name: newName, color: '#ff0000' }
        const itemsWithNew = items.concat(newItem)
        setItems(itemsWithNew)
        setNewName('')
        setShowNew(false)
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const updateName = (id) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, name: newName } : item
        )

        setItems(updatedItems)
        setEditing(null)
        setNewName('')
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
                                setNewName(item.name)
                                setEditing(item.id)
                            }}
                            onDelete={() => deleteItem(item.id)}
                        />
                    }
                >
                    {editing && editing === item.id ? (
                        <EditSubject
                            value={newName}
                            onClose={() => {
                                setEditing(null)
                                setNewName('')
                            }}
                            onConfirm={() => updateName(item.id)}
                            handleNameChange={handleNameChange}
                        />
                    ) : (
                        <DataBar
                            handleColorChange={handleColorChange}
                            item={item}
                        />
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
                    onClose={() => {
                        setShowNew(null)
                        setNewName('')
                    }}
                    onConfirm={createNew}
                    handleNameChange={handleNameChange}
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

const EditSubject = ({ onClose, handleNameChange, onConfirm, value }) => {
    return (
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
                }}
            >
                <IconButton sx={{ mr: 3 }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <TextField
                    label="Update name"
                    value={value}
                    onChange={handleNameChange}
                ></TextField>
            </div>

            <Fab
                color="primary"
                aria-label="add"
                onClick={onConfirm}
                size="medium"
            >
                <CheckIcon />
            </Fab>
        </Box>
    )
}

const DataBar = ({ item, handleColorChange }) => {
    return (
        <>
            <ColorPicker
                id={item.id}
                c={item.color}
                updateList={handleColorChange}
            />
            <ListItemText
                primary={item.name}
                sx={{ textTransform: 'capitalize' }}
            />
        </>
    )
}

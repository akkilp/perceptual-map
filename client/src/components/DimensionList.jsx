import {
    Container,
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Button,
    Divider,
    TextField,
    FormControl,
    FormLabel,
    Radio,
    FormControlLabel,
    RadioGroup,
    Fab,
    ButtonGroup,
} from '@mui/material'

import React from 'react'

import ColorPicker from './ColorPicker'

import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

import { v4 as uuid } from 'uuid'
import Add from '@mui/icons-material/Add'

import EditDimension from './EditDimension'
import EditButtons from './EditButtons'

import { deleteDimension } from '../api_calls'

import { useSubmit } from '../hooks/useSubmit'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useMessager from '../hooks/useMessager'

const DimensionList = ({
    dimensions,
    title = 'Dimensions',
    emptyLabel = 'There exists no dimensions',
}) => {
    const [items, setItems] = React.useState(dimensions)
    const [showNew, setShowNew] = React.useState(false)
    const [editing, setEditing] = React.useState(null)

    const { displayMessage } = useMessager()

    const [handleApiSubmit, loading, error, response] =
        useSubmit(deleteDimension)

    const { mapId } = useParams()

    useEffect(() => {
        if (response) {
            displayMessage(response.statusText, 'success')
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

    const updateList = (newItem) => {
        const duplicatesRemoved = items.filter((item) => item.id !== newItem.id)
        const newList = duplicatesRemoved.concat(newItem)
        setItems(newList)
        setShowNew(null)
        setEditing(null)
    }

    const isEmpty = items.length <= 0

    const renderList = items.map((item) => {
        const infoString = `${item.valueType} · Min value: ${item.minValue} · Max value: ${item.maxValue}`
        return (
            <div key={item.id}>
                <ListItem
                    key={item.id}
                    sx={{
                        paddingRight: 2,
                    }}
                    secondaryAction={
                        <EditButtons
                            hide={editing || showNew}
                            onEdit={() => setEditing(item.id)}
                            onDelete={() => handleApiSubmit(item.id, mapId)}
                        />
                    }
                >
                    {editing && editing === item.id ? (
                        <EditDimension
                            data={item}
                            handleClose={() => setEditing(false)}
                            editing={true}
                            handleUpdate={updateList}
                        />
                    ) : (
                        <ListItemText
                            primary={item.name}
                            secondary={infoString}
                            sx={{ textTransform: 'capitalize' }}
                        />
                    )}
                </ListItem>
                <Divider component="li" />
            </div>
        )
    })

    return (
        <>
            <List
                sx={{ p: 0 }}
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
                {showNew ? (
                    <EditDimension
                        handleClose={() => setShowNew(false)}
                        handleUpdate={updateList}
                    />
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            variant="contained"
                            sx={{ alignSelf: 'end', mt: 3 }}
                            onClick={() => setShowNew(true)}
                            disabled={editing ? true : false}
                        >
                            Create new
                        </Button>
                    </div>
                )}
            </List>
        </>
    )
}
export default DimensionList

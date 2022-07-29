import {
    ListItem,
    List,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Typography,
    ListItemIcon,
    Checkbox,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import React from 'react'

const SelectList = ({
    items,
    label,
    emptyLabel = 'There are no items',
    handleSelect,
}) => {
    const [checked, setChecked] = React.useState([])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        handleSelect(newChecked)
    }
    return (
        <List
            subheader={
                <ListSubheader component="div" id="">
                    {label}
                </ListSubheader>
            }
            sx={{ py: 2 }}
            dense
        >
            {!items || items.length <= 0 ? (
                <Typography>{emptyLabel}</Typography>
            ) : (
                items.map((item) => (
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleToggle(item.id)}
                            key={item.id}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(item.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': item.id,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={item.id} primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))
            )}
        </List>
    )
}

export default SelectList

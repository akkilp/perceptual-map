import {
    ListItem,
    List,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ClickableList = ({ items, label, emptyLabel = 'There are no items' }) => {
    const navigate = useNavigate()
    const listContents =
        !items || items.length <= 0 ? (
            <Typography>{emptyLabel}</Typography>
        ) : (
            <>
                {items.map((item) => {
                    return (
                        <ListItem
                            key={item.title}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={(event) => console.log('hurraa')}
                                >
                                    ···
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton
                                onClick={() => navigate(`/maps/${item.id}`)}
                            >
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </>
        )

    return (
        <List
            subheader={
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    {label}
                </Typography>
            }
        >
            {listContents}
        </List>
    )
}

export default ClickableList

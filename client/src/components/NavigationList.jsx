import {
    ListItem,
    List,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Typography,
    Container,
    Divider,
} from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'

import Loading from './Loading'

import makeAuthHeader from '../util/makeAuthHeader'

const NavigationList = ({
    label,
    emptyLabel = 'There are no items',
    apiFunc,
}) => {
    const navigate = useNavigate()

    const [loading, error, data] = useFetch(apiFunc)

    if (loading) {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    mt: 20,
                    mb: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Loading />
            </Container>
        )
    }

    if (error) {
        return <div> Could not fetch answered data</div>
    }

    const items = data.data

    const listContents =
        !items || items.length <= 0 ? (
            <Typography>{emptyLabel}</Typography>
        ) : (
            <>
                {items.map((item) => {
                    return (
                        <>
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(`/maps/${item.id}`)}
                                >
                                    <ListItemText
                                        primary={item.title}
                                        secondary={item.description}
                                    />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        </>
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

export default NavigationList

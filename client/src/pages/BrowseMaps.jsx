import {
    ListItem,
    List,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Typography,
    Container,
} from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'

import { fetchAllMaps, fetchAnsweredMaps } from '../api_calls'

import makeAuthHeader from '../util/makeAuthHeader'

import NavigationList from '../components/NavigationList'

const BrowseMaps = () => {
    return (
        <Container maxWidth="md">
            <NavigationList
                apiFunc={fetchAllMaps}
                label="Browse maps"
                emptyLabel="You have not answered to maps yet."
            />
        </Container>
    )
}

export default BrowseMaps

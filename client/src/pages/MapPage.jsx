
import { useParams } from 'react-router-dom';
import {Container, Typography, Box} from '@mui/material'
import { useEffect,useState, Suspense } from 'react'
import fetchMap from '../api_calls/fetchMap';

import useFetch from '../hooks/useFetch';


const MapPage = () => {
let { mapId } = useParams();
    const [loading, error, data] = useFetch(fetchMap(mapId))


    if(loading) return <h2>loading....</h2>
    if(error & !loading) return <h2>vituiks män: {error.status + error.message}</h2>

    const {title, createdBy, description, answers, dimensions} = data.data;

    return(
        <Container>
            {(!loading && !error && data && data.success) ?
            ( 
                <div>

                    <h2>Map data:</h2>
                    <ul>
                        <li>{title}</li>
                        <li>{createdBy.username}</li>
                        <li>{description}</li>
                        <li>Number of answers: {answers.length}</li>
                        

                    </ul>
                    <h2>Dimensions</h2>
                    <ul>
                        {dimensions.map(dim => <li>{dim.name} {dim.valueType}</li>)}
                    </ul>
                </div>
            )
            : <div>This should not be rendered never</div>
            }
                
        </Container>
    )
}

export default MapPage;
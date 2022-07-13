import { ListItem, List, IconButton, ListItemText, ListSubheader, ListItemButton, Typography } from "@mui/material";

const ClickableList = ({items, label}) => {
    return(
        <List
        subheader={
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {label}
          </Typography>
        }
        >
            {items.map((item)=> (


                                <ListItem
                                    key={item}
                                    secondaryAction={
                                        <IconButton 
                                            edge="end" 
                                            aria-label="delete" 
                                            onClick={(event) => console.log("icon button clicked", event)}>
                                            ···
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton onClick={(event)=>console.log("inside button clicked", event)}>
                                        <ListItemText primary={item}/>
                                    </ListItemButton>
                                </ListItem>
        ))}
        </List>
    )
}

export default ClickableList;
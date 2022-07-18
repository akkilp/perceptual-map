import { IconButton, ButtonGroup } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'

const EditButtons = ({ onDelete, onEdit, hide }) => {
    if (hide) return

    return (
        <ButtonGroup disableElevation variant="contained">
            <IconButton onClick={onEdit}>
                <EditIcon />
            </IconButton>

            <IconButton onClick={onDelete}>
                <CloseIcon />
            </IconButton>
        </ButtonGroup>
    )
}

export default EditButtons

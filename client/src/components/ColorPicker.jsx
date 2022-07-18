import { BlockPicker } from 'react-color'
import React from 'react'

const ColorPicker = ({ id, updateList, c, locked }) => {
    const [color, setColor] = React.useState(c)
    const [show, setShow] = React.useState(false)

    const popOverStyles = {
        position: 'absolute',
        backgroundColor: 'green',
        zIndex: '2',
        top: '100%',
        left: -55,
    }

    const coverStyles = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    const handleClose = () => {
        setShow(!show)
    }

    const handleColorChange = (col) => {
        setColor(col)
        updateList(id, col)
    }

    return (
        <>
            <div
                style={{
                    backgroundColor: c.hex || c,
                    height: 25,
                    width: 25,
                    borderRadius: '50%',
                    marginRight: 10,
                    cursor: 'pointer',
                }}
                onClick={() => setShow(locked ? false : !show)}
            ></div>
            {show && (
                <div style={popOverStyles}>
                    <div style={coverStyles} onClick={handleClose} />
                    <BlockPicker
                        color={color}
                        onChangeComplete={(col) => handleColorChange(col)}
                    />
                </div>
            )}
        </>
    )
}

export default ColorPicker

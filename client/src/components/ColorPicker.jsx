import { BlockPicker } from 'react-color'
import React from 'react'

const ColorPicker = ({ updateChange, initColor }) => {
    const [color, setColor] = React.useState(initColor)
    const [show, setShow] = React.useState(false)

    const popOverStyles = {
        position: 'absolute',
        zIndex: '2',
        top: '100%',
        left: -14,
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
        updateChange(col)
    }

    return (
        <>
            <div
                style={{
                    backgroundColor: color.hex || color,
                    height: 30,
                    width: 30,
                    borderRadius: '50%',
                    marginRight: 10,
                    cursor: 'pointer',
                }}
                onClick={() => setShow(!show)}
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

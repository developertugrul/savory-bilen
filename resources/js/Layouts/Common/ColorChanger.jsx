import {useState} from "react";

const ColorChanger = () => {
    const [color, setColor] = useState('color-1');
    const [colorName, setColorName] = useState('Default');
    const [colorPicker, setColorPicker] = useState(false);
    const [colorPickerPosition, setColorPickerPosition] = useState('right');
    const [colorPickerPositionClass, setColorPickerPositionClass] = useState('right');

    const changeColor = (color, colorName) => {
        setColor(color);
        setColorName(colorName);
        setColorPicker(false);
    }

    const changeColorPickerPosition = (position) => {
        setColorPickerPosition(position);
        setColorPickerPositionClass(position);
    }

    return (
        <>
            <div className={`color-picker ${colorPickerPositionClass}`}>
                <div className="color-picker-toggle" onClick={() => setColorPicker(!colorPicker)}>
                    <i className="fa fa-cog fa-spin"/>
                </div>
                <div className={`color-picker-body ${colorPicker ? 'active' : ''}`}>
                    <div className="color-picker-header">
                        <h6>Color Picker</h6>
                        <div className="color-picker-close" onClick={() => setColorPicker(false)}>
                            <i className="fa fa-times"/>
                        </div>
                    </div>
                    <div className="color-picker-content">
                        <div className="color-picker-position">
                            <h6>Position</h6>
                            <div className="color-picker-position-body">
                                <div className={`color-picker-position-item ${colorPickerPosition === 'right' ? 'active' : ''}`} onClick={() => changeColorPickerPosition('right')}>
                                    <i className="fa fa-arrow-right"/>
                                </div>
                                <div className={`color-picker-position-item ${colorPickerPosition === 'left' ? 'active' : ''}`} onClick={() => changeColorPickerPosition('left')}>
                                    <i className="fa fa-arrow-left"/>
                                </div>
                            </div>
                        </div>
                        <div className="color-picker-colors">
                            <h6>Colors</h6>
                            <div className="color-picker-colors-body">
                                <div className={`color-picker-colors-item ${color === 'color-1' ? 'active' : ''}`} onClick={() => changeColor('color-1', 'Default')}>
                                    <div className="color-picker-colors-item-color color-1"/>
                                </div>
                                <div className={`color-picker-colors-item ${color === 'color-2' ? 'active' : ''}`} onClick={() => changeColor('color-2', 'Blue')}>
                                    <div className="color-picker-colors-item-color color-2"/>
                                </div>
                                <div className={`color-picker-colors-item ${color === 'color-3' ? 'active' : ''}`} onClick={() => changeColor('color-3', 'Green')}>
                                    <div className="color-picker-colors-item-color color-3"/>
                                </div>
                                <div className={`color-picker-colors-item ${color === 'color-4' ? 'active' : ''}`} onClick={() => changeColor('color-4', 'Red')}>
                                    <div className="color-picker-colors-item-color color-4"/>
                                </div>
                                <div className={`color-picker-colors-item ${color === 'color-5' ? 'active' : ''}`} onClick={() => changeColor('color-5', 'Yellow')}>
                                    <div className="color-picker-colors-item-color color-5"/>
                                </div>
                                <div className={`color-picker-colors-item ${color === 'color-6' ? 'active' : ''}`} onClick={() => changeColor('color-6', 'Purple')}>
                                    <div className="color-picker-colors-item-color color-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`color-changer ${color}`}>
                <div className="color-changer-body">
                    <div className="color-changer-body-item">
                        <i className="fa fa-cog fa-spin"/>
                    </div>
                    <div className="color-changer-body-item">
                        <h6>{colorName}</h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ColorChanger;

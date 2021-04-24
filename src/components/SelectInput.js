import React from 'react'

const SelectInput = ({
    name,
    onChange,
    value,
    placeholder,
    options,
}) => {
    return (
        <select name={name} onChange={onChange} value={value}>
            <option value={0}>{placeholder}.</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.content}</option>
            ))}
        </select>
    )
}

export default SelectInput
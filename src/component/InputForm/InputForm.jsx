import { Input } from 'antd'
import React, { useState } from 'react'
import { WapperInputStyle } from './style'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const InputForm = (props) => {
    const {valueInput, setValueInput} = useState('')
    const {placeholder = 'Nhập text', ...rests} = props
  return (
        <WapperInputStyle placeholder={placeholder} valueInput = {valueInput} {...rests}>
        </WapperInputStyle>
  )
}

export default InputForm
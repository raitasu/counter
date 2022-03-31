import React from 'react';
import {Button} from "@mui/material";

type ButtonType = {
    title: string
    callBack: () => void
    disable?:boolean
}

export const UniversalButton = (props: ButtonType) => {
    const title = props.title
    const onClickHandler = () => {
        props.callBack()
    }
    const style = {
        backgroundColor:'rebeccapurple'
    }
    return (
        <Button sx ={style} variant="contained" onClick={onClickHandler} disabled={props.disable}>{title}</Button>);
};

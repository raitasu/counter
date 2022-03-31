import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { UniversalButton } from "./components/UniversalButton";
import { TextField } from "@mui/material";

function App() {

    const [count, setCount] = useState<number>(0)
    const [maxValue, setMaxValue] = useState(5)
    const [startValue, setStartValue] = useState(0)

    useEffect(() => {

        let countToString = localStorage.getItem('counterKey')
        if (countToString != null) {
            setCount(JSON.parse(countToString))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('counterKey', JSON.stringify(count))
    }, [count])

    const incCountHandler = () => {
        if (count < maxValue)
            setCount(count + 1)
    }
    const setCountHandler = () => {
        setCount(0)

    }
    const onChangeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let minValue = e.currentTarget.value
        // localStorage.setItem('minValue', minValue)
        setStartValue(Number(minValue))
    }
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let maxValue = e.currentTarget.value
        // localStorage.setItem('maxValue', maxValue)
        setMaxValue(+maxValue)
    }
    const setLocalStorageHandler = () => {
        // let minValue = localStorage.getItem('minValue')
        // if (minValue != null) {
        //     setCount(JSON.parse(minValue))
        // }
        // let maxValue = localStorage.getItem('maxValue')
        // if (maxValue != null) {
        //     setMaxValue(JSON.parse(maxValue))
        // }
    }

    const handleSetStartAndMaxValue = ()=> {

    }

    return (
        <div className="App">
            <div className={'counter'}>
                <div className={count === maxValue ? 'counterDisplayTrue' : 'counterDisplay'}>{count}</div>
                <div className={'counterButtons'}>
                    <UniversalButton title={'inc'} callBack={incCountHandler} disable={count === maxValue} />
                    <UniversalButton title={'reset'} callBack={setCountHandler} disable={count === 0} />
                </div>
            </div>
            <div className={'setCounter'}>
                <div className={'setCounterDisplay'}>
                    <div className={'maxValue'}>
                        <div className={'input'}>max value:</div>
                        <div><TextField type={'number'} id="filled-basic" variant="filled" size={'small'}
                            onChange={onChangeMaxValueHandler} value={maxValue} /></div>
                    </div>
                    <div className={'minValue'}>
                        <div className={'input'}>start value:</div>
                        <div><TextField type={'number'} id="filled-basic" variant="filled" size={'small'}
                            onChange={onChangeMinValueHandler} value={startValue} /></div>
                    </div>
                </div>
                <div className={'setButton'}>
                    <UniversalButton title={'set'} callBack={setLocalStorageHandler} />

                </div>

            </div>


        </div>
    );
}

export default App;

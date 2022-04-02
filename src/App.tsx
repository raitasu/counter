import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { UniversalButton } from "./components/UniversalButton";
import { TextField } from "@mui/material";

const localStorageMaxValue = localStorage.getItem("maxValue");
const localStorageStartValue = localStorage.getItem("startValue");

const defaultStartValue = Number(localStorageStartValue)
  ? Number(localStorageStartValue)
  : 0;
const defaultMaxValue = Number(localStorageMaxValue)
  ? Number(localStorageMaxValue)
  : 5;

function App() {
  const [count, setCount] = useState<number>(defaultStartValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  const [startValue, setStartValue] = useState(defaultStartValue);

  const [hasError, setHasError] = useState(false);
  const [isDisableSetButton, setIsDisableSetButton] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("maxValue")) {
      localStorage.setItem("maxValue", String(5));
      localStorage.setItem("startValue", String(0));
    }
  }, []);

  useEffect(() => {
    setIsDisableSetButton(
      maxValue === Number(localStorage.getItem("maxValue")) &&
        startValue === Number(localStorage.getItem("startValue"))
    );
  }, [startValue, maxValue]);

  useEffect(() => {
    if (startValue < 0 || maxValue <= startValue) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [startValue, maxValue]);

  const incCountHandler = () => {
    if (
      count < Number(localStorage.getItem("maxValue")) &&
      count >= Number(localStorage.getItem("startValue"))
    ) {
      setCount(count + 1);
    }
  };

  const setCountHandler = () => {
    setCount(Number(localStorage.getItem("startValue")));
  };

  const onChangeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let minValue = e.currentTarget.value;
    // localStorage.setItem('minValue', minValue)
    setStartValue(Number(minValue));
  };

  const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let maxValue = e.currentTarget.value;
    setMaxValue(+maxValue);
  };

  const setLocalStorageHandler = () => {
    localStorage.setItem("maxValue", String(maxValue));
    localStorage.setItem("startValue", String(startValue));
    if (count < startValue) {
      setCount(startValue);
    } else if (count > maxValue) {
      setCount(maxValue);
    }
    setIsDisableSetButton(true);
  };

  return (
    <div className="App">
      <div className={"counter"}>
        <div
          className={
            count === maxValue ? "counterDisplayTrue" : "counterDisplay"
          }
        >
          {count}
        </div>
        <div className={"counterButtons"}>
          <UniversalButton
            title={"inc"}
            callBack={incCountHandler}
            disable={count === maxValue || hasError}
          />
          <UniversalButton
            title={"reset"}
            callBack={setCountHandler}
            disable={count === startValue || hasError}
          />
        </div>
      </div>
      <div className={"setCounter"}>
        <div className={"setCounterDisplay"}>
          <div className={"maxValue"}>
            <div className={"input"}>max value:</div>
            <div>
              <TextField
                type={"number"}
                id="filled-basic"
                variant="filled"
                size={"small"}
                onChange={onChangeMaxValueHandler}
                value={maxValue}
              />
            </div>
          </div>
          <div className={"minValue"}>
            <div className={"input"}>start value:</div>
            <div>
              <TextField
                type={"number"}
                id="filled-basic"
                variant="filled"
                size={"small"}
                onChange={onChangeMinValueHandler}
                value={startValue}
              />
            </div>
          </div>
        </div>
        <div className={"setButton"}>
          <UniversalButton
            title={"set"}
            callBack={setLocalStorageHandler}
            disable={isDisableSetButton || hasError}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

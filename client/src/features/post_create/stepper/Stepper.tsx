import { useState, useEffect, FC } from "react";
import { Button, Steps } from "antd";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
  showStepFirst,
  showStepSecond,
  showStepThird,
} from "../../../services/ui/postStepsSlice";
import { items, steps } from "./StepperConfigs";
import useWindowSize from "../../../hooks/useWindowSize";

const Stepper: FC = () => {
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  useEffect(() => {
    function handleDispatch() {
      if (current === 0) {
        return dispatch(showStepFirst());
      } else if (current === 1) {
        return dispatch(showStepSecond());
      }
      return dispatch(showStepThird());
    }
    handleDispatch();
  }, [current, dispatch]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      {width > 1000 ? (
        <div className="w-[20%] border-r h-[80vh] sticky top-20 ">
          <Steps
            current={current}
            items={items}
            direction="vertical"
            className=" h-[300px] mt-12  "
          />
          <div className="steps-action ">
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-[100%] z-[100] mb-8  sticky top-0  bg-white">
          <Steps
            current={current}
            items={items}
            type="inline"
            direction="horizontal"
            className="!flex !justify-center !font-bold"
            onChange={(num) => setCurrent(num)}
          />
        </div>
      )}
    </>
  );
};

export default Stepper;

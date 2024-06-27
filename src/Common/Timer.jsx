import React, { useEffect, useReducer } from 'react';

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'DECREMENT_SECONDS':
      return { ...state, seconds: state.seconds - 1 };
    case 'DECREMENT_MINUTES':
      return {
        ...state,
        minutes: state.minutes - 1,
        seconds: 59,
      };
    case 'COMPLETE':
      return { ...state, completed: true };
    case 'RESET':
      return { minutes: 1, seconds: 30, completed: false };
    default:
      return state;
  }
};

const Timer = ({
  onClick = () => {},
  completedContent,
}) => {
  const [state, dispatch] = useReducer(timerReducer, {
    minutes: 0,
    seconds: 59,
    completed: false,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.seconds > 0) {
        dispatch({ type: 'DECREMENT_SECONDS' });
      } else if (state.minutes > 0) {
        dispatch({ type: 'DECREMENT_MINUTES' });
      } else {
        dispatch({ type: 'COMPLETE' });
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state]);

  return (
    <>
      {state.completed ? (
        <span
          onClick={() => {
            dispatch({ type: 'RESET' });
            onClick();
          }}
        >
          {completedContent}
        </span>
      ) : (
        <>
          <span>
            {state.minutes ? `${state.minutes}:` : null}
          </span>
          <span>{`${state.seconds}s`}</span>
        </>
      )}
    </>
  );
};

export default Timer;

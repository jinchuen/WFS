import React, { memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/web';
import { useAlterComponents } from './AlterContext.jsx';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const springBase = {
  from: { opacity: 0, transform: 'translateY(-100px)' },
  to: { opacity: 1, transform: 'translateY(0%)' },
  config: { duration: 300 },
};

const AlterToast = ({ id, type, message, onClose }) => {
  const spring = useSpring(springBase);
  return (
    <animated.div
      role="alert"
      className={`alert alert-${type} cursor-pointer alert-soft`}
      style={spring}
      onClick={() => onClose(id)}
    >
			{type === 'success' ? <CheckCircleIcon className="h-6 w-6 shrink-0" /> 
			: 
			<XCircleIcon className="h-6 w-6 shrink-0" />}
      <span>{message}</span>
    </animated.div>
  );
};

const AlterComponents = () => {
  const { alerts, removeAlert } = useAlterComponents();

  return (
    <div className="fixed top-1 right-1 w-[25%] z-50 flex flex-col gap-2">
      {alerts.map(({ id, type, message }) => (
        <AlterToast
          key={id}
          id={id}
          type={type}
          message={message}
          onClose={removeAlert}
        />
      ))}
    </div>
  );
};

export default memo(AlterComponents);
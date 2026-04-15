import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Countdown.css';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return newTimeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="countdown-unit">
      <motion.div 
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="countdown-value"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="countdown-label">{label}</div>
    </div>
  );

  return (
    <div className="countdown-container">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <div className="countdown-separator">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="countdown-separator">:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="countdown-separator">:</div>
      <TimeUnit value={timeLeft.seconds} label="Segs" />
    </div>
  );
};

export default Countdown;

import React, { useEffect, useState } from 'react';
import { FormControl } from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface IDataProps {
  onChange: (time: string, date: string) => void;
  clear: boolean;
}

type TDayjs = Dayjs | null;

export function Date({ onChange, clear }: IDataProps) {
  const initialTime = {
    from: dayjs(),
    to: dayjs().add(1, 'hour'),
  };
  const [time, setTime] = useState<Record<'from' | 'to', TDayjs>>(initialTime);
  const [date, setDate] = useState<TDayjs>(dayjs());

  useEffect(() => {
    onChange(
      time.from?.format('HH:mm') + ' - ' + time.to?.format('HH:mm'),
      date?.format('DD-MM-YYYY') || ''
    );
  }, [time.from, time.to, date]);

  useEffect(() => {
    setDate(dayjs());
    setTime(initialTime);
  }, [clear]);

  return (
    <FormControl fullWidth margin='normal'>
      <DatePicker
        value={date}
        onChange={(newValue) => setDate(newValue)}
        disablePast
        format='DD-MM-YYYY'
        sx={{ marginBottom: '20px' }}
      />
      <TimeField
        sx={{ marginBottom: '20px' }}
        label='C'
        value={time.from}
        onChange={(newValue) => setTime({ ...time, from: newValue })}
        format='HH:mm'
      />
      <TimeField
        label='До'
        value={time.to}
        onChange={(newValue) => setTime({ ...time, to: newValue })}
        format='HH:mm'
      />
    </FormControl>
  );
}

import React, { FormEvent, useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Paper,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import { Button, Textarea } from '@mui/joy';
import { UFormSelect } from '../../components/UFormSelect';
import { generateId } from '../../utils/generateRandomIndex';
import dayjs, { Dayjs } from 'dayjs';

export function Booking() {
  const [tower, setTower] = useState({
    title: 'Башня',
    list: ['A', 'Б'],
    value: '',
  });
  const [floor, setFloor] = useState({
    title: 'Этаж',
    list: Array.from({ length: 25 }, (_, i) => String(i + 3)),
    value: '',
  });
  const [room, setRoom] = useState({
    title: 'Комната',
    list: Array.from({ length: 10 }, (_, i) => String(i + 1)),
    value: '',
  });

  const [comment, setComment] = useState('');

  const initialTime = {
    from: dayjs(),
    to: dayjs().add(1, 'hour'),
  };
  const [time, setTime] = useState<Record<'from' | 'to', Dayjs | null>>(initialTime);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [err, setErr] = useState('');

  const handleChangeData = (e: SelectChangeEvent, title: string) => {
    switch (title) {
      case tower.title:
        setTower({ ...tower, value: e.target.value });
        break;
      case floor.title:
        setFloor({ ...floor, value: e.target.value });
        break;
      case room.title:
        setRoom({ ...room, value: e.target.value });
        break;
    }
  };

  const handleClearForm = () => {
    setFloor({ ...floor, value: '' });
    setRoom({ ...room, value: '' });
    setTower({ ...tower, value: '' });
    setTime(initialTime);
    setDate(dayjs);
    setComment('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr('');
    try {
      [tower, floor, room].map((item) => {
        if (!item.value) throw new Error();
      });
      const result = {
        tower: tower.value,
        floor: +floor.value,
        room: +room.value,
        date: date?.format('DD-MM-YYYY'),
        time: time.from?.format('HH:mm') + ' - ' + time.to?.format('HH:mm'),
        comment,
      };
      console.log(result);
    } catch (e) {
      setErr('Все обязательные поля должны быть заполнены');
    }
  };

  return (
    <Paper sx={{ padding: 4, border: err ? '1px solid red' : 'transparent' }}>
      <form onSubmit={handleSubmit}>
        <Typography fontSize='32px' component='h1'>
          Бронь переговорки
        </Typography>

        {[tower, floor, room].map(generateId).map((item) => (
          <React.Fragment key={item.id}>
            <UFormSelect
              title={item.title}
              value={item.value}
              dataList={item.list}
              id={item.id}
              handleChange={(e) => handleChangeData(e, item.title)}
            />
          </React.Fragment>
        ))}
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
        <FormControl fullWidth margin='normal'>
          <FormLabel>Комментарий</FormLabel>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Оставьте свой комментарий'
            minRows={3}
          />
        </FormControl>
        <Box display='flex' gap='50px' justifyContent={'space-between'}>
          <Button onClick={handleClearForm} fullWidth variant='outlined' type='button'>
            Отчистить
          </Button>
          <Button fullWidth type='submit'>
            Отправить
          </Button>
        </Box>
        {err && (
          <Typography padding='10px' fontSize='14px' color='red'>
            {err}
          </Typography>
        )}
      </form>
    </Paper>
  );
}

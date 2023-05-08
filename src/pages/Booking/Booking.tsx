import React, { FormEvent, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Button } from '@mui/joy';
import { Date } from './Date';
import { Place } from './Place';
import { Comment } from './Comment';

export function Booking() {
  const [data, setData] = useState({
    tower: '',
    floor: 0,
    room: 0,
    date: '',
    time: '',
    comment: '',
  });

  const [err, setErr] = useState('');
  const [isClear, setIsClear] = useState(false);

  const handleChangeDateAndTime = (time: string, date: string) => {
    setData({ ...data, date, time });
    setIsClear(false);
  };

  const handleChangePlace = (tower: string, floor: string, room: string) => {
    setData({ ...data, tower, floor: +floor, room: +room });
    setIsClear(false);
  };

  const handleChangeComment = (comment: string) => {
    setData({ ...data, comment });
    setIsClear(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr('');
    try {
      [data.tower, data.floor, data.room].map((item) => {
        if (!item) throw new Error();
      });
      console.log(data);
    } catch (e) {
      setErr('Все обязательные поля должны быть заполнены');
    }
  };

  return (
    <Paper sx={{ padding: 4, border: err ? '1px solid red' : 'transparent' }}>
      <form onSubmit={handleSubmit}>
        <Typography fontSize='32px' component='h1' textAlign='center'>
          Бронь переговорки
        </Typography>
        <Place clear={isClear} onChange={handleChangePlace} />
        <Date onChange={handleChangeDateAndTime} clear={isClear} />
        <Comment
          title='Комментарий'
          placeholder='Оставьте свой комментарий'
          onChange={handleChangeComment}
          clear={isClear}
        />
        <Box display='flex' gap='50px' justifyContent={'space-between'}>
          <Button onClick={() => setIsClear(true)} fullWidth variant='outlined' type='button'>
            Очистить
          </Button>
          <Button fullWidth type='submit'>
            Отправить
          </Button>
        </Box>
        {err && (
          <Typography padding='10px' fontSize='14px' color='red' textAlign='center'>
            {err}
          </Typography>
        )}
      </form>
    </Paper>
  );
}

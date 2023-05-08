import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { UFormSelect } from '../../../components/UFormSelect';
import { generateId } from '../../../utils/generateRandomIndex';

interface IPlaceProps {
  clear: boolean;
  onChange: (tower: string, floor: string, room: string) => void;
}

export function Place({ onChange, clear }: IPlaceProps) {
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

  const handleChangeData = (value: string, title: string) => {
    switch (title) {
      case tower.title:
        setTower({ ...tower, value });
        break;
      case floor.title:
        setFloor({ ...floor, value });
        break;
      case room.title:
        setRoom({ ...room, value });
        break;
    }
  };

  useEffect(() => {
    onChange(tower.value, floor.value, room.value);
  }, [...[floor, tower, room].map((item) => item.value)]);

  useEffect(() => {
    [tower, floor, room].forEach((item) => handleChangeData('', item.title));
  }, [clear]);

  return (
    <Box>
      {[tower, floor, room].map(generateId).map((item) => (
        <React.Fragment key={item.id}>
          <UFormSelect
            title={item.title}
            value={item.value}
            dataList={item.list}
            id={item.id}
            handleChange={(e) => handleChangeData(e.target.value, item.title)}
          />
        </React.Fragment>
      ))}
    </Box>
  );
}

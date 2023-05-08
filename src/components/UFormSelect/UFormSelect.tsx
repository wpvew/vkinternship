import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface IUFormSelectProps<T> {
  title: string;
  value: T;
  dataList: Array<T>;
  id: string;
  handleChange: (e: SelectChangeEvent<T>) => void;
}

export function UFormSelect<T extends number | string>(props: IUFormSelectProps<T>) {
  const { dataList, title, value, id, handleChange } = props;
  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel id={`simple-select-label-${id}`}>
        {title}
        <Typography display='inline' color={'red'}>
          *
        </Typography>
      </InputLabel>
      <Select
        labelId={`simple-select-label-${id}`}
        id={`simple-select-${id}`}
        value={value}
        label={title}
        onChange={(e) => handleChange(e)}
      >
        {dataList.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

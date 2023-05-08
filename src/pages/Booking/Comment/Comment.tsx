import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel } from '@mui/material';
import { Textarea } from '@mui/joy';

interface ICommentProps {
  title: string;
  placeholder: string;
  onChange: (comment: string) => void;
  clear: boolean;
}

export function Comment({ title, placeholder, onChange, clear }: ICommentProps) {
  const [comment, setComment] = useState('');

  useEffect(() => {
    onChange(comment);
  }, [comment]);

  useEffect(() => {
    setComment('');
  }, [clear]);
  return (
    <FormControl fullWidth margin='normal'>
      <FormLabel>{title}</FormLabel>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeholder}
        minRows={3}
      />
    </FormControl>
  );
}

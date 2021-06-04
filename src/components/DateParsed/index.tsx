import { formatDistanceStrict, formatDistanceToNow } from 'date-fns';
import { formatDistance } from 'date-fns/esm';
import { pt } from 'date-fns/locale';
import React, { useMemo } from 'react';

import { Container, Title } from './styles';

interface DateParsedProps {
  date?: Date;
}

const DateParsed: React.FC<DateParsedProps> = ({ date }) => {
  const dateParsed = useMemo(() => {
    if (date) {
      try {
        return formatDistanceToNow(new Date(date), {
          locale: pt,
          addSuffix: true,
          includeSeconds: true,
        });
      } catch (error) {
        return null;
      }
    }
    return '';
  }, [date]);
  return (
    <Container>
      <Title>{dateParsed || ''}</Title>
    </Container>
  );
};

export default DateParsed;

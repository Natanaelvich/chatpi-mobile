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
        return formatDistance(new Date(date), new Date(), {
          locale: pt,
          addSuffix: true,
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

import { formatRelative, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import React, { useMemo } from 'react';

import { Container, Title } from './styles';

interface DateParsedProps {
  date: Date;
}

const DateParsed: React.FC<DateParsedProps> = ({ date }) => {
  const dateParsed = useMemo(() => {
    try {
      return formatRelative(date, new Date(), {
        locale: pt,
        addSuffix: true,
      });
    } catch (error) {
      return null;
    }
  }, [date]);
  return (
    <Container>
      <Title>{dateParsed}</Title>
    </Container>
  );
};

export default DateParsed;

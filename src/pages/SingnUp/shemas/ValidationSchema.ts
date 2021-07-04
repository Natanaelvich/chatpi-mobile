import * as yup from 'yup';
import { ValidateEmail } from '../../../utils/validations';

export function getSchema(): any {
  return yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .required('E-mail é obrigatório')
      .test('Email Test', 'O E-mail é inválido', value => {
        return ValidateEmail(value as string);
      }),
    password: yup
      .string()
      .required('Senha é obrigatório')
      .min(6, 'Deve conter no minímo 6 caractéres'),
  });
}

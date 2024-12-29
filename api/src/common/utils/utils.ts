import { v4 as uuidv4 } from 'uuid';

export function generateRandomNumber(): number {
  return Math.floor(Math.random() * 100);
}

export function formatDate(dateValue: Date, aditionalYear?: number): string {
  const date = new Date(dateValue);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = ((date.getFullYear() + aditionalYear) % 100).toString();

  return `${month}/${day}/${year}`;
}

export function getDateNowEmail() {
  const meses = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const ahora = new Date();
  const dia = ahora.getUTCDate();
  const mes = meses[ahora.getUTCMonth()];
  const ano = ahora.getUTCFullYear();
  const hora = formatNumber(ahora.getUTCHours());
  const minuto = formatNumber(ahora.getUTCMinutes());

  return `${ano} ${mes} ${dia} ${hora}:${minuto} Z`;
}

function formatNumber(numero: number) {
  return numero < 10 ? 0 + numero : numero;
}

export function generateGuid(): string {
  return uuidv4();
}

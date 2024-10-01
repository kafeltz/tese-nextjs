import Image from "next/image";

import {
  format,
  isValid,
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  subDays,
  subHours,
  subMinutes,
} from "date-fns";

/*
- Conceito
	- Sobre a Data de publicação:
		Até 24 horas: contagem minutos e em horas
		De 1 a 7 dias: contagem em dias
		+ de 7 dias: exibe a data completa da notícia (29/08/23)

	- Exemplos:
		- Agora
		- 1 Minuto atrás
		- 2 Minutos atrás
    ...
		- 59 Minutos atrás
		- 1 Hora atrás
		- 2 Horas atrás
    ...
		- 23 Horas atrás
		- 1 Dia atrás
		- 2 Dias atrás
		- 7 Dias atrás
		- 29/01/2020

*/

// Formato esperado: "2024-10-01T10:18:35.000000Z"
function FormatCardDate(dateString: string | Date) {
  const date = new Date(dateString);

  if (!isValid(date)) {
    return "";
  }

  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hourDifference = differenceInHours(now, date);
  const diffDays = differenceInDays(now, date);

  if (minutes < 1) {
    return "Agora";
  } else if (minutes == 1) {
    return "1 Minuto atrás";
  } else if (minutes < 60) {
    return `${minutes} Minutos atrás`;
  } else if (hourDifference == 1) {
    return "1 Hora atrás";
  } else if (hourDifference < 24) {
    return `${hourDifference} Horas atrás`;
  } else if (diffDays == 1) {
    return `${diffDays} Dia atrás`;
  } else if (diffDays < 8) {
    return `${diffDays} Dias atrás`;
  } else {
    return format(date, "dd/MM/yyyy");
  }
}

export default function Home() {
  const now = new Date();

  const dates = [];

  dates.push(subMinutes(now, 1));
  dates.push(subMinutes(now, 2));
  dates.push(subMinutes(now, 3));
  dates.push(subMinutes(now, 59));
  dates.push(subMinutes(now, 60));

  dates.push(subHours(now, 1));
  dates.push(subHours(now, 2));
  dates.push(subHours(now, 3));
  dates.push(subHours(now, 59));
  dates.push(subHours(now, 60));

  dates.push(subDays(now, 1));
  dates.push(subDays(now, 2));
  dates.push(subDays(now, 3));
  dates.push(subDays(now, 4));
  dates.push(subDays(now, 5));
  dates.push(subDays(now, 6));
  dates.push(subDays(now, 7));
  dates.push(subDays(now, 8));

  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start gap-8 row-start-2">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1>Tese do funcionamento do ISR</h1>

        {dates.map((value, i) => {
          return <p>Data: {FormatCardDate(value)}</p>;
        })}

        <h1>Tese do funcionamento do ISR</h1>
      </main>
      <footer className="flex flex-wrap justify-center items-center gap-6 row-start-3">
        footer
      </footer>
    </div>
  );
}

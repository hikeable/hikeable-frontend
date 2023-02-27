import moment from "moment";

function getLastNDays(num: number) {
  let dates: string[] = [];
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();

  for (let i = 0; i < num; i++) {
    let date = new Date(today.getFullYear(), month, day - i);
    dates.push(
      `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    );
  }
  return dates.reverse();
}

function getDayAndMonth(dates: string[]): string[] {
  let returnDates: string[] = [];
  for (let i = 0; i < dates.length; i++) {
    const [day, month, year] = dates[i].split("/");
    returnDates.push(`${day}/${month}`);
  }
  return returnDates;
}

function compareDate(input: string, a: string): boolean {
  let inputDate = moment(input, "DD-MM-YYYY");
  let aDate = moment(a, "YYYY-MM-DD");

  if (
    inputDate.year() === aDate.year() &&
    inputDate.month() === aDate.month() &&
    inputDate.date() === aDate.date()
  ) {
    return true;
  }

  return false;
}

export { getDayAndMonth, getLastNDays, compareDate };

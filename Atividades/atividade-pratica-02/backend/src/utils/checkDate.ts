import AppError from "../shared/errors/AppError";

function checkDate(date: string) {
  const dateSplited = date.split('/');

  const day = Number(dateSplited[0]);
  const month = Number(dateSplited[1]);
  const year = Number(dateSplited[2]);

  const dateToCheck = new Date(year, month - 1, day);

  if (dateToCheck.getTime() < new Date().getTime()) {
    throw new AppError('Date must be greater than today', 400);
  }

  return dateToCheck

}

export { checkDate }
/** Methods */
const withPadding = (data) => {
  return data.length === 1 ? `0${data}` : data;
}

const parseAndFormatDate = () => {
  const parsedDate = new Date();

  const day = parsedDate.getDate();
  const month = (parsedDate.getMonth() + 1);
  const year = parsedDate.getFullYear();
  const hour = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const seconds = parsedDate.getSeconds();

  const DD = withPadding(day);
  const MM = withPadding(month);
  const YY = withPadding(year);
  const HH = withPadding(hour);
  const mm = withPadding(minutes);
  const ss = withPadding(seconds);

  return `${DD}/${MM}/${YY} ${HH}:${mm}:${ss}`;
}

module.exports = parseAndFormatDate;
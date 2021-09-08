const formatDate = (date: number, locales = 'en-US'): string =>
  new Intl.DateTimeFormat(locales, {month: 'short', year: '2-digit'}).format(
    date,
  )

export {formatDate}

import chalk from 'chalk'
export const withMessage = (
  callback: () => void,
  message: string,
  {solo}: {solo?: boolean} = {solo: true},
) => {
  try {
    callback()
  } catch (error) {
    if (solo) {
      throw `🚨 ${chalk.reset.red(message)}`
    } else {
      error.message = `🚨 ${chalk.reset.red(message)} \n\n ${error.message}`
    }
  }
}

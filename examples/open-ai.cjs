const { completion } = require('..');
(async function main () {
  const res = await completion('gpt-3.5-turbo', [], {})

  console.log('res', res)
})()

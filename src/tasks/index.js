const CronJob = require('cron').CronJob
const dailyReportMibrMatches = require('./daily/dailyReportMibrMatches')

const handleScheduleTasks = async client => {
  const job = new CronJob('0 0 12 * * *', () => dailyReportMibrMatches(client))
  job.start()
}

module.exports = handleScheduleTasks

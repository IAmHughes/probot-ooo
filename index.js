// Use UTC for for all Date parsing
process.env.TZ = 'UTC';

const commands = require('probot-commands')
const Sherlock = require('sherlockjs')
const moment = require('moment')

module.exports = robot => {
  // Type `/ooo from to until` in a comment box for an Issue or Pull Request
  const keyword = 'ooo'
  const handler = (context, command) => {
    let ooo = Sherlock.parse(command.arguments),
        sender = context.payload.sender.login,
        owner = context.payload.repository.owner.login,
        repo = context.payload.repository.name,
        comment_id = context.payload.comment.id,
        comment_html_url = context.payload.comment.html_url

    // TODO
    // Preserve the following data
    console.log('startDate', ooo.startDate)
    console.log('endDate', ooo.endDate)
    console.log('sender', sender)
    console.log('owner', owner)
    console.log('repo', repo)
    console.log('comment_id', comment_id)
    console.log('comment_html_url', comment_html_url)

    // Respond with confirmation
    context.github.issues.createComment(context.issue({
      body: `:+1: Marked @${sender} as [OOO from ${moment(ooo.startDate).format("dddd, MMMM Do YYYY")} to ${moment(ooo.endDate).format("dddd, MMMM Do YYYY")}](${comment_html_url}) :calendar:.`
    }))
  }

  commands(robot, keyword, handler)

  // TODO
  // Get this to work for issues.opened as well
  // const command = new commands.Command(keyword, handler)
  // robot.on('issues.opened', command.listener.bind(command))
}

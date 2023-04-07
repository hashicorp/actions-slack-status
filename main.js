module.exports = ({context, core}) => {
    let workflowURL = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.run_id}`;
    let status = core.getInput("status");
    core.debug(`Computed workflow URL: ${workflowURL}`);
    let color;
    let message;
    switch (status) {
        case 'success':
            color = "#476ce5"; // blue
            message = core.getInput("success-message");
            if (message == "") {
                core.warning("No success message set, skipping Slack status");
                return
            }
            break;
        case 'failure':
            color = "#ed5c5c"; // red
            message = core.getInput("failure-message");
            if (message == "") {
                core.warning("No failure message set, skipping Slack status");
                return
            }
        case 'cancelled':
            color = "#5c5c5c"; // gray
            message = core.getInput("cancelled-message");
            if (message == "") {
                core.warning("No cancelled message set, skipping Slack status");
                return
            }
        case 'skipped':
            color = "#a18d29"; // yellow
            message = core.getInput("skipped-message");
            if (message == "") {
                core.warning("No skipped message set, skipping Slack status");
                return
            }
        default:
            core.error(`Unsupported status value, please check inputs: '${status}'`)
            return
    }
    return {
        "attachments": [
            {
                "title": `Workflow Status`,
                "mrkdwn_in": ["text"],
                "color": color,
                "text": `*Repository:* \`${context.repo.owner}/${context.repo.repo}\`\n*Workflow:* ${context.workflow}\n\n${message}\n\n<${workflowURL}|View Workflow>`,
            }
        ]
    };
}

_For internal HashiCorp use only. The output of this action is specifically designed to satisfy the needs of our internal deployment system, and may not be useful to other organizations._

# Slack workflow status action

No bells, no whistles, just status a status message.

## Example

See also some implementations in the wild:
- [hashicorp/vault-helm](https://github.com/hashicorp/vault-helm/blob/bb9a069/.github/workflows/update-helm-charts-index.yml#L34-L40)

Notifications will be emitted with some simple formatting:

![sample color coded slack notifications](docs/example-notifications.png)

## Usage

1. Create a webhook

Use either [Technique 2](https://github.com/slackapi/slack-github-action#technique-2-slack-app) or 
[Technique 3](https://github.com/slackapi/slack-github-action#technique-3-slack-incoming-webhook) here. Alternatively,
Release Engineering may provision one on your behalf for status notifications from our [Release Bot](https://api.slack.com/apps/A034FRWL0RK/incoming-webhooks).

Do *not* use Slack's Workflow Builder integration to generate the webhook link.

2. Add the step to the workflow

To use, add a step like:

```yaml
steps:
  # ...
  - run: |
      echo "This run failed!" 1>&2
      exit 1
  - uses: hashicorp/actions-slack-status@v1
    if: ${{always()}}
    with:
      success-message: ":tada: A success message."
      failure-message: ":boom: A failure message."
      status: ${{job.status}
      slack-webhook-url: ${{secrets.slack_webhook_url}}
```

Or more advanced usage, pass a specific step conclusion:

```yaml
steps:
  # ...
  - if: ${{ 'skip-me' == 'true' }}  # this demo will always skip, use a real test instead :)
    id: demo
    run: |
      exit 0
  - uses: hashicorp/actions-slack-status@v1
    with:
      skipped-message: ":skip: A successfully skipped cmd message."
      success-message: ":tada: A success message."
      status: ${{steps.demo.conclusion}}
      slack-webhook-url: ${{secrets.slack_webhook_url}}
```


Note: Normally, if an `${status}-message` is not defined for a given status a
GH warning will be emitted on the action and no message will be sent to slack.
To avoid this, one can use an approprate `if` statement to skip this step.

In this example, success messages are never sent and no GHA warning will be
emitted regarding this omission.
```yaml
steps:
  # ...
  - run: |
      exit 0
  - uses: hashicorp/actions-slack-status@v1
    if: failure()
    with:
      failure-message: "How did this fail, it was so simple!"
      status: ${{job.status}}
      slack-webhook-url: ${{secrets.slack_webhook_url}}
```


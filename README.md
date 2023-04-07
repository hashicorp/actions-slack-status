# Slack workflow status action

No bells, no whistles, just status.

## Usage

Create a webhook through either [Technique 2](https://github.com/slackapi/slack-github-action#technique-2-slack-app) or 
[Technique 3](https://github.com/slackapi/slack-github-action#technique-3-slack-incoming-webhook) here. Alternatively,
Release Engineering may provision one on your behalf for status notifications from our [Release Bot](https://api.slack.com/apps/A034FRWL0RK/incoming-webhooks).

To use, add a step like:

```yaml
steps:
  # ...
  - run: |
      echo "This run failed!" 1>&2
      exit 1
  - uses: hashicorp/action-slack-status@v1
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
  - uses: hashicorp/action-slack-status@v1
    with:
      skipped-message: ":skip: A successfully skipped cmd message."
      success-message: ":tada: A success message."
      status: ${{steps.demo.conclusion}}
      slack-webhook-url: ${{secrets.slack_webhook_url}}
```

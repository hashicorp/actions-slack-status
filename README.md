# Slack workflow status action

No bells, no whistles, just status.

## Usage

Create a webhook through either [Technique 2](https://github.com/slackapi/slack-github-action#technique-2-slack-app) or [Technique 3](https://github.com/slackapi/slack-github-action#technique-3-slack-incoming-webhook) here. Alternatively, Release engineering may provision one on your behalf for status notifications.


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
        was-successful: ${{success()}}
        slack-webhook-url: ${{secrets.slack_webhook_url}}
```

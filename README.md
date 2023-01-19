# pulsepoint-alerts

Receive email alerts when a PulsePoint incident is dispatched in a specified location. Uses Google APIs to send messages from a Gmail account.

Requires [OAuth2 setup](https://support.google.com/cloud/answer/6158849) in Google Cloud Console to obtain client credentials. Use [OAuth Playground](https://developers.google.com/oauthplayground/) to get a refresh token, using https://mail.google.com as a scope.

Uses a free [MapQuest API](https://developer.mapquest.com/) key to visually map incident locations in relation to the configured alert region.

## Configuration

Set up the app with the following in `config.json`

| Key                        | Value                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `agencies`                 | Array of PulsePoint agency ids.                                                                                                                        |
| `mailingList`              | Array of email addresses to notify upon a new incident in the alert region.                                                                            |
| `checkInterval`            | Interval in minutes to check for new dispatches. This should be lower than the average time for most calls, but not too low to avoid spamming the API. |
| `alertRegion.center`       | Array of two numbers representing latitude and longitude of the center of the alert region.                                                            |
| `alertRegion.radius`       | Number in miles representing the radius to search around the center point.                                                                             |
| `credentials.email`        | Gmail address of the account used.                                                                                                                     |
| `credentials.clientId`     | Obtainable from Google Cloud Console.                                                                                                                  |
| `credentials.clientSecret` | Obtainable from Google Cloud Console.                                                                                                                  |
| `credentials.refreshToken` | Obtainable from Google OAuth Playground.                                                                                                               |
| `mapQuestKey`              | Obtainable from MapQuest Developer                                                                                                                     |

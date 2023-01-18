import requests
import json


url = "https://api.strike.me/v1/subscriptions"


payload = json.dumps({
  "webhookUrl": "https://lightning-news.herokuapp.com/status",
  "webhookVersion": "v1",
  "secret": "ScKc2Phr37RzfESKGYPh6CnZqNxc9t",
  "enabled": True,
  "eventTypes": [
    "invoice.created",
    "invoice.updated"
  ]
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer D45484BDA8260C1C33F9D12412B230DDB3AE82E629E71E626D43A17F59979D9B'
}


response = requests.request("POST", url, headers=headers, data=payload)


print(response.text)


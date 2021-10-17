---
sidebar_position: 2
---

# Camera (Optional)

TODO: Change orientation of diagram
![Camera Flow Diagram](../../../static/diagrams/camera-flow.drawio.png)

## How does it work?

TODO

## Ngrok

TODO: Add info about Ngrok

Create [Ngrok](https://ngrok.com/) account or use already created.
In `Getting Started -> Your Authtoken` section copy you Authtoken.

## Device

```dotenv
CAMERA_USAGE_ENABLED=true
CAMERA_USE_WIRED=true
NGROK_LOCAL_CAMERA_ADDRESS=http://localhost:8081
NGROK_REGION=eu
NGROK_AUTH_TOKEN=
```

## Client

```dotenv
REACT_APP_CAMERA_PREVIEW_ENABLED=true
```

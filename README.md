# PassCall card for Home Assistant

[PassCall](https://passcall.io) turns a screen in a room you walk through into a window
between two homes. When you and a friend both happen to walk past your screens, a short
video call opens on its own. Walk away, and it closes. No scheduling, no dialing.

This card puts a PassCall window on a Home Assistant dashboard, with the camera and
microphone permissions the embedded page needs.

![PassCall on two portrait TVs](https://passcall.io/images/two-screens.jpg)

## Requirements

- A free PassCall account at <https://my.passcall.io>.
- Home Assistant opened over **HTTPS**. Browsers only share the camera with an embedded
  page when the page around it is secure. Nabu Casa remote access, the DuckDNS add-on or
  your own certificate all work. The card shows a notice if it is opened over plain http.
- A device with a camera and a current browser: a tablet, a laptop or a small computer
  attached to a TV. (Smart displays such as Nest Hub and Echo Show do not let third-party
  pages use their cameras.)

## Install

**With HACS:** HACS → Frontend → search for "PassCall" → Download. Until the card is in the
default HACS list, add this repository first: HACS → three-dot menu → Custom repositories →
`https://github.com/pcummins1/passcall-card`, category *Dashboard*.

**By hand:** copy `passcall-card.js` to your `config/www/` folder and add it as a dashboard
resource: Settings → Dashboards → three-dot menu → Resources → Add →
`/local/passcall-card.js`, type *JavaScript module*.

## Use

Add a new dashboard view, set its type to **Panel**, and add one card:

```yaml
type: custom:passcall-card
```

That is all. Sign in to PassCall inside the card once; the browser remembers it.

Options:

| option         | default                   | meaning                                        |
|----------------|---------------------------|------------------------------------------------|
| `url`          | `https://my.passcall.io/` | the PassCall address to embed                  |
| `aspect_ratio` | `16:9`                    | height of the card when it is not in a panel   |

## Privacy

PassCall is a window, not a camera feed: nothing is recorded, nothing is sold, and face
detection runs on your own device. The full list of what PassCall holds is at
<https://passcall.io/privacy/>.

## Licence

MIT.

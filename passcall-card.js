/*
 * PassCall card for Home Assistant
 * https://github.com/pcummins1/passcall-card
 *
 * Puts a PassCall window (https://my.passcall.io) on a dashboard with the camera and
 * microphone permissions the embedded page needs. Best used in a panel view so the
 * window fills the screen.
 */
const DEFAULT_URL = "https://my.passcall.io/";
const ALLOW = "camera; microphone; autoplay; fullscreen; display-capture";

class PassCallCard extends HTMLElement {
  static getStubConfig() {
    return { url: DEFAULT_URL };
  }

  setConfig(config) {
    this._config = Object.assign({ url: DEFAULT_URL, aspect_ratio: "16:9" }, config || {});
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  getCardSize() {
    return 10;
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    const cfg = this._config;
    const insecure = window.location.protocol !== "https:" && window.location.hostname !== "localhost";
    const ratio = String(cfg.aspect_ratio || "16:9").replace(":", " / ");
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        ha-card { height: 100%; overflow: hidden; background: #0f2a1e; }
        .wrap { position: relative; width: 100%; height: 100%; min-height: 240px; }
        .fit { aspect-ratio: ${ratio}; }
        :host-context(hui-panel-view) .wrap, :host-context(.panel) .wrap { position: absolute; inset: 0; aspect-ratio: auto; }
        iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block; background: #0f2a1e; }
        .notice { position: absolute; left: 0; right: 0; bottom: 0; padding: 10px 14px; background: rgba(158, 42, 43, .92); color: #fff; font: 14px/1.4 system-ui, sans-serif; }
        .notice a { color: #fff; }
      </style>
      <ha-card>
        <div class="wrap fit">
          <iframe src="${cfg.url}" allow="${ALLOW}" allowfullscreen title="PassCall"></iframe>
          ${insecure ? `<div class="notice">PassCall needs Home Assistant to be opened over HTTPS before the browser will share the camera. Open this dashboard at your https:// address (Nabu Casa, DuckDNS or your own certificate).</div>` : ""}
        </div>
      </ha-card>`;
  }
}

if (!customElements.get("passcall-card")) customElements.define("passcall-card", PassCallCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "passcall-card",
  name: "PassCall",
  description: "A PassCall window: when you and a friend both walk past your screens, you see each other.",
  preview: false,
  documentationURL: "https://github.com/pcummins1/passcall-card"
});

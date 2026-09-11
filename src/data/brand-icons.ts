import type { Metadata } from "next";

// A single explicit icon set avoids the obsolete app/icon.svg overriding the
// new artwork. Versioned URLs let browsers request fresh assets after publish.
const base = "/images/brand/icons";

export const brandIcons: Metadata["icons"] = {
  icon: [16, 32, 48, 192, 512].map(size => ({
    url: `${base}/wd-icon-v2-${size}.png`,
    type: "image/png",
    sizes: `${size}x${size}`,
  })),
  shortcut: [{ url: `${base}/wd-favicon-v2.ico`, type: "image/x-icon" }],
  apple: [{
    url: `${base}/wd-apple-touch-v2.png`,
    type: "image/png",
    sizes: "180x180",
  }],
};

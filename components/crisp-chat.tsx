"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    $crisp: any
    CRISP_WEBSITE_ID: string
  }
}

export default function CrispChat() {
  useEffect(() => {
    const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID

    if (typeof window !== "undefined" && crispWebsiteId) {
      window.$crisp = []
      window.CRISP_WEBSITE_ID = crispWebsiteId

      const script = document.createElement("script")
      script.src = "https://client.crisp.chat/l.js"
      script.async = true
      document.getElementsByTagName("head")[0].appendChild(script)
    }
  }, [])

  return null
}

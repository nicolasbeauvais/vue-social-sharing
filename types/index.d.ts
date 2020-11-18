import { PluginObject } from "vue"

export interface Props {
  network: string
  url: string
  title: string
  description?: string
  quote?: string
  hashtags?: string
  twitterUser?: string
  media?: string
  tag?: string
  popup?: { width: number; height: number }
}

export interface PluginOptions {
  networks: Record<string, string>
}

declare const VueSocialSharing: PluginObject<PluginOptions>

export default VueSocialSharing

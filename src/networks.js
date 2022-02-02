/**
 * We use shorter names to reduce the final bundle size
 *
 * Properties:
 * @u = url
 * @t = title
 * @d = description
 * @q = quote
 * @h = hashtags
 * @m = media
 * @tu = twitterUser
 */

export default {
  baidu: 'http://cang.baidu.com/do/add?iu=@u&it=@t',
  buffer: 'https://bufferapp.com/add?text=@t&url=@u',
  email: 'mailto:?subject=@t&body=@u%0D%0A@d',
  evernote: 'https://www.evernote.com/clip.action?url=@u&title=@t',
  facebook: 'https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d&quote=@q&hashtag=@h',
  flipboard: 'https://share.flipboard.com/bookmarklet/popout?v=2&url=@u&title=@t',
  hackernews: 'https://news.ycombinator.com/submitlink?u=@u&t=@t',
  instapaper: 'http://www.instapaper.com/edit?url=@u&title=@t&description=@d',
  line: 'http://line.me/R/msg/text/?@t%0D%0A@u%0D%0A@d',
  linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=@u',
  messenger: 'fb-messenger://share/?link=@u',
  odnoklassniki: 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=@u&st.comments=@t',
  pinterest: 'https://pinterest.com/pin/create/button/?url=@u&media=@m&description=@t',
  pocket: 'https://getpocket.com/save?url=@u&title=@t',
  quora: 'https://www.quora.com/share?url=@u&title=@t',
  reddit: 'https://www.reddit.com/submit?url=@u&title=@t',
  skype: 'https://web.skype.com/share?url=@t%0D%0A@u%0D%0A@d',
  sms: 'sms:?body=@t%0D%0A@u%0D%0A@d',
  stumbleupon: 'https://www.stumbleupon.com/submit?url=@u&title=@t',
  telegram: 'https://t.me/share/url?url=@u&text=@t%0D%0A@d',
  tumblr: 'https://www.tumblr.com/share/link?url=@u&name=@t&description=@d',
  twitter: 'https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h@tu',
  viber: 'viber://forward?text=@t%0D%0A@u%0D%0A@d',
  vk: 'https://vk.com/share.php?url=@u&title=@t&description=@d&image=@m&noparse=true',
  weibo: 'http://service.weibo.com/share/share.php?url=@u&title=@t&pic=@m',
  whatsapp: 'https://api.whatsapp.com/send?text=@t%0D%0A@u%0D%0A@d',
  wordpress: 'https://wordpress.com/press-this.php?u=@u&t=@t&s=@d&i=@m',
  xing: 'https://www.xing.com/social/share/spi?op=share&url=@u&title=@t',
  yammer: 'https://www.yammer.com/messages/new?login=true&status=@t%0D%0A@u%0D%0A@d'
}

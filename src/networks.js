export default {
  facebook: {
    sharer: 'https://www.facebook.com/sharer/sharer.php?u=@url&title=@title&description=@description&quote=@quote',
    type: 'popup'
  },

  twitter: {
    sharer: 'https://twitter.com/intent/tweet?text=@title&url=@url&hashtags=@hashtags@twitteruser',
    type: 'popup'
  },

  googleplus: {
    sharer: 'https://plus.google.com/share?url=@url',
    type: 'popup'
  },

  pinterest: {
    sharer: 'https://pinterest.com/pin/create/button/?url=@url&media=@media&description=@title',
    type: 'popup'
  },

  reddit: {
    sharer: 'http://www.reddit.com/submit?url=@url&title=@title',
    type: 'popup'
  },

  linkedin: {
    sharer: 'https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description',
    type: 'popup'
  },

  whatsapp: {
    sharer: 'whatsapp://send?text=@url',
    type: 'direct',
    action: 'share/whatsapp/share'
  }
};

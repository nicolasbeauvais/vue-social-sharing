const $window = typeof window !== 'undefined' ? window : null

export const usePopup = (options = { width: 626, height: 436 }) => {
  let popupInterval = null
  let popupWindow = null
  const width = $window.innerWidth || (document.documentElement.clientWidth || $window.screenX)
  const height = $window.innerHeight || (document.documentElement.clientHeight || $window.screenY)
  const systemZoom = width / $window.screen.availWidth

  const popupLeft = (width - options.width) / 2 / systemZoom + ($window.screenLeft !== undefined ? $window.screenLeft : $window.screenX)
  const popupTop = (height - options.height) / 2 / systemZoom + ($window.screenTop !== undefined ? $window.screenTop : $window.screenY)

  const share = (shareLink, key) => {
    console.log(shareLink, key)
    // If a popup window already exist, we close it and trigger a change event.
    if (popupWindow && popupInterval) {
      clearInterval(popupInterval)

      // Force close (for Facebook)
      popupWindow.close()

      // emit('change')
    }

    popupWindow = $window.open(
      shareLink,
      'sharer-' + key,
      ',height=' + options.height +
      ',width=' + options.width +
      ',left=' + popupLeft +
      ',top=' + popupTop +
      ',screenX=' + popupLeft +
      ',screenY=' + popupTop
    )

    // If popup are prevented (AdBlocker, Mobile App context..), popup.window stays undefined and we can't display it
    if (!popupWindow) return

    popupWindow.focus()

    // Create an interval to detect popup closing event
    popupInterval = setInterval(() => {
      if (!popupWindow || popupWindow.closed) {
        clearInterval(popupInterval)

        popupWindow = null

        // emit('close')
      }
    }, 500)
  }

  const touch = (shareLink) => {
    $window.open(shareLink, '_blank')

    // emit('open')
  }

  return { share, touch }
}

function reportError(error) {
  console.error(`Error: ${error}`)
}

async function fetchProducts(tab) {
  console.log(tab)
  let url = chrome.extension.getURL('data/api_resp.json')
  fetch(url).then(async (ret) => {
    let apiData = await ret.text()
    try {
      chrome.tabs.sendMessage(tab.id || tab.tabId, {
        type: 'enable',
        data: apiData,
      })
    } catch (e) {
      reportError(e)
    }
  })
}

chrome.browserAction.onClicked.addListener(fetchProducts)

// chrome.tabs.onActivated.addListener(fetchProducts)

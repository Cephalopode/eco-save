var modal = `
<div id="eco-find">
<div class="modal ">
<div class="modal-background"></div>
<div class="modal-content box">
</div>
<button class="modal-close is-large" aria-label="close"></button>
</div>
</div>
`
var elem = document.createElement('div')
elem.innerHTML = modal
document.body.appendChild(elem)
//temp  //matches: ["<all_urls>"],  ["*://info.cern.ch/*"],

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'enable':
      if ($('#eco-find > .modal').hasClass('is-active')) return
      $('#eco-find > .modal').addClass('is-active')
      let data = JSON.parse(request.data)
      for (let product of data) {
        let title = product.titre.length > 30 ? product.titre.substr(0, 30) + '...' : product.titre
        $('#eco-find .modal-content').append(`
          <div class="card">
          <a class="card-link" href="${product.url}">
            <div class="card-image">
              <figure class="image">
                <img src="${product.photo}" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <p>${title}</p>
              <h5 class="title is-5 price">${product.price.toFixed(2)} €</h5>
            </div>
            </a>
          </div>
        `)
      }
  }
})

$('.modal-close')[0].addEventListener('click', function (event) {
  console.log('cl', event)
  $('#eco-find > .modal').removeClass('is-active')
  // clear modal content
  let modalContent = $('#eco-find .modal-content')[0]
  while (modalContent.lastElementChild) {
    let a = modalContent.removeChild(modalContent.lastElementChild)
  }
})

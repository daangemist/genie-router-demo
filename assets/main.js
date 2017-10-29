/* global $ */
var genieRouterEndpoint = null
var introMessage = null

function startChat (endpoint) {
  genieRouterEndpoint = endpoint
  introMessage = $('.router').html()

  $('.show-intro').click(function (ev) {
    ev.preventDefault()
    $('.router').html(introMessage)
  })

  $('#send-randomized').click(function (ev) {
    ev.preventDefault()
    sendMessage(randomizeUserInput())
  })

  $('.chat-input').keypress(function (ev) {
    if (ev.which === 13) {
      ev.preventDefault()
      sendMessage($(this).val())
      $(this).val('')
    }
  })
}

function sendMessage (input) {
  var inputObj = {input: input}
  $('.user').text(input).removeClass('hidden')
  $('.show-intro').removeClass('hidden')
  $('.router').html('<img src="demo/assets/typing.png" width="64" height="16" />')
  $.ajax({
    url: genieRouterEndpoint + '/api/message',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(inputObj)
  })
    .done(function (response) {
      $('.router').text(response.message.message)
    })
    .fail(function (error) {
      console.log(error)
      $('.router').text('Error, unfortunately. Try again.')
    })
}

function randomizeUserInput () {
  // First, determine whether we talk to genie or eliza
  var brain = getRandomValue(['genie', 'eliza'])
  if (brain === 'genie') {
    return sendGenieInput()
  } else {
    return sendElizaInput()
  }
}

function sendGenieInput () {
  var sentence = []
  sentence.push(getRandomValue(['Ask genie', 'Tell me genie', 'Get from genie']))
  sentence.push(getRandomValue(['what is', 'who is', 'where is']))
  sentence.push(getRandomValue(['the guy', 'the ostrich', 'the animal', 'the owner']))
  sentence.push(getRandomValue(['which', 'from', 'who']))
  sentence.push(getRandomValue(['opens', 'closes', 'demoes']))
  sentence.push(getRandomValue(['the universe', 'number 42', 'aladdin', 'movies']))

  return sentence.join(' ')
}

function sendElizaInput () {
  return getRandomValue([
    'Hi I am looking at your demo',
    'Yes',
    'No',
    'Which one?',
    'I sometimes feel empty inside',
    'What do you mean?'
  ])
}

function getRandomValue (inputArray) {
  return inputArray[Math.floor((Math.random() * inputArray.length))]
}

/* global $, localStorage */
var genieRouterEndpoint = null
var introMessage = null
var userId = null

function startChat (endpoint) {
  userId = generateUserId()
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
  var inputObj = {input: input, metadata: {userId: userId}}
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
  var sentence = getRandomValue(['Ask genie ', 'Tell me genie ', 'Get from genie ', 'Use dialogflow '])
  return sentence + getRandomValue([
    'who created you?',
    'what does the fox say?',
    'Is there a roadmap?',
    'can I add my own plugins?',
    'what is genie-router?'
  ])
}

function sendElizaInput () {
  return getRandomValue([
    'Hi I am looking at your demo',
    'Yes',
    'No',
    'Which one?',
    'I sometimes feel empty inside',
    'What do you mean?',
    'Who is there?',
    'Please respond to this',
    'Are you intelligent?',
    'Process this!'
  ])
}

function getRandomValue (inputArray) {
  return inputArray[Math.floor((Math.random() * inputArray.length))]
}

function generateUserId () {
  if (localStorage.getItem('genie-router-demo-userId')) {
    return localStorage.getItem('genie-router-demo-userId')
  }

  var id = (new Date()).getTime()
  localStorage.setItem('genie-router-demo-userId', id)
  return id
}

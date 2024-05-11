const form = document.getElementById('mailForm')
const referenceIdInput = document.getElementById('refId')
const departmentInput = document.querySelector('.department')
const filenameInput = document.getElementById('filename')
const categoryInput = document.querySelector('.category')
const stateInput = document.querySelector('.state')
const LGAInput = document.getElementById('LGA')
const mailTopicInput = document.getElementById('mailTopic')
const dateInput = document.getElementById('date')
const timeInput = document.getElementById('time')


form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const referenceId = referenceIdInput.value
    const department = departmentInput.options[departmentInput.selectedIndex].text
    const filename = filenameInput.value
    const category = categoryInput.options[categoryInput.selectedIndex].text
    const state = stateInput.options[stateInput.selectedIndex].text
    const LGA = LGAInput.value
    const mailTopic = mailTopicInput.value
    const date = dateInput.value
    const time = timeInput.value

    const data = { referenceId, department, filename, category, state, LGA, mailTopic, date, time }

    const request = await axios.post('http://localhost:3002/api/mail', data)
})
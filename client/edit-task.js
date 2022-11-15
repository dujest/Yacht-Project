const nameDOM = document.querySelector('.edit-name')
const lengthDOM = document.querySelector('.edit-length')
const beamDOM = document.querySelector('.edit-beam')
const draftDOM = document.querySelector('.edit-draft')
const dispDOM = document.querySelector('.edit-disp')
const lcbDOM = document.querySelector('.edit-lcb')
const cpDOM = document.querySelector('.edit-cp')
const vDOM = document.querySelector('.edit-v')
const rDOM = document.querySelector('.edit-resistance')
const editFormDOM = document.querySelector('.single-data-form')
const editBtnDOM = document.querySelector('.yacht-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const { data: yacht } = await axios.get(`/yachts/${id}`)
    const { yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance } = yacht
    nameDOM.value = yacht_name
    lengthDOM.value = length_wl
    beamDOM.value = beam_wl
    draftDOM.value = draft
    dispDOM.value = displacement
    lcbDOM.value = centre_of_buoyancy
    cpDOM.value = prismatic_coefficient
    vDOM.value = velocity
    rDOM.value = resistance

  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()

  try {
    const { data: yacht } = await axios.put(`/yachts/${id}`, {
      // yacht_name: nameDOM.value,
      // length_wl: lengthDOM.value,
      // beam_wl: beamDOM.value,
      // draft: draftDOM.value,
      // displacement: dispDOM.value,
      // centre_of_buoyancy: lcbDOM.value,
      // prismatic_coefficient: cpDOM.value,
      // velocity: vDOM.value

      yacht_name: e.target[0].value,
      length_wl: parseFloat(e.target[1].value),
      beam_wl: parseFloat(e.target[2].value),
      draft: parseFloat(e.target[3].value),
      displacement: parseFloat(e.target[4].value),
      centre_of_buoyancy: parseFloat(e.target[5].value),
      prismatic_coefficient: parseFloat(e.target[6].value),
      velocity: parseFloat(e.target[7].value)
    })

    const { yacht_name, length_wl, beam_wl, draft, displacement, centre_of_buoyancy, prismatic_coefficient, velocity, resistance } = yacht

    nameDOM.value = yacht_name
    lengthDOM.value = length_wl
    beamDOM.value = beam_wl
    draftDOM.value = draft
    dispDOM.value = displacement
    lcbDOM.value = centre_of_buoyancy
    cpDOM.value = prismatic_coefficient
    vDOM.value = velocity
    rDOM.value = resistance

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `The residuary resistance has been updated!`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3500)
})
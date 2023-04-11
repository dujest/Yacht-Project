const loadingDOM = document.querySelector('.loading-text')
const yachtsDOM = document.querySelector('.yachts')
const formDOM = document.querySelector('.data-form')
const taskInputDOM = document.querySelector('.data-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load yachts from /yachts
const showYachts = async () => {
    loadingDOM.style.visibility = 'visible'

    try {
        const { data: yachts } = await axios.get('/yachts')
        if (yachts.length < 1) {
            yachtsDOM.innerHTML =
                '<h5 class="empty-list">No yachts in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }
        const allYachts = yachts
            .map((yacht) => {
                const { id, yacht_name, velocity, resistance } = yacht
                return `<div class="single-yacht">
                        <h5>${yacht_name}</h5>
                        <h6 style="font-size: 0.75rem;">Resistance = ${resistance} N (at ${velocity} knots)</h6>
                        <div class="yacht-links">
                        <!-- edit link -->
                        <a href="yacht.html?id=${id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                        </a>
                        <!-- delete btn -->
                        <button type="button" class="delete-btn" data-id="${id}">
                        <i class="fas fa-trash"></i>
                        </button>
                        </div>
                        </div>`
            })
            .join('')
        yachtsDOM.innerHTML = allYachts
    } catch (error) {
        throw error
    }

    loadingDOM.style.visibility = 'hidden'
}

showYachts()

// delete a yacht from /yachts/:id

yachtsDOM.addEventListener('click', async (e) => {
    const el = e.target

    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible'
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/yachts/${id}`)
            showYachts()
        } catch (error) {
            throw error
        }
    }

    loadingDOM.style.visibility = 'hidden'
})

// post a yacht

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()

    let l = parseFloat(e.target[1].value)
    let v = parseFloat(e.target[7].value)
    let kt_ms = 0.5144
    let g = 9.81
    let fn = (v * kt_ms) / Math.sqrt(g * l)
    if (fn > 0.45) {
        alert(`
The Froude number must be lower than 0.450 to be within the capabilities of the ML model!\n
Fn = (velocity * 0.5144) [m/s] / sqrt(9.81 * w_length) [m/s] < 0.450\n
Your current Froude number is ${fn.toFixed(3)}\n
Increase the waterline length or decrease the velocity!
        `)
    } else {
        try {
            await axios.post('/yachts', {
                yacht_name: e.target[0].value,
                length_wl: parseFloat(e.target[1].value),
                beam_wl: parseFloat(e.target[2].value),
                draft: parseFloat(e.target[3].value),
                displacement: parseFloat(e.target[4].value),
                centre_of_buoyancy: parseFloat(e.target[5].value),
                prismatic_coefficient: parseFloat(e.target[6].value),
                velocity: parseFloat(e.target[7].value),
            })
            showYachts()
            formAlertDOM.style.display = 'block'
            formAlertDOM.textContent = `The residuary resistance has been predicted!`
            formAlertDOM.classList.add('text-success')
        } catch (error) {
            formAlertDOM.style.display = 'block'
            formAlertDOM.innerHTML = `error, please try again`
        }

        setTimeout(() => {
            formAlertDOM.style.display = 'none'
            formAlertDOM.classList.remove('text-success')
        }, 3500)
    }
})

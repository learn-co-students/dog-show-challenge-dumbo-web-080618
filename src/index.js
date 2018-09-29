document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'http://localhost:3000/dogs'
  const tableBody = document.getElementById('table-body')
  const dogForm = document.getElementById('dog-form')
  const formTitle = document.querySelector('#form-heading')

  function updateDog(evt){
    formTitle.innerText = 'Edit an Existing Dog'
    // debugger
    console.log(evt)
    alert('edit works!!')
    let dogObj = {
      name: evt.target.name.value,
      breed: evt.target.breed.value,
      sex: evt.target.sex.value
    }
    let id = parseInt(evt.target.dataset.id)
    fetch(`${baseURL}/${id}`, {
      headers: {
        'Application': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(dogObj)
    }).then(res => res.json())
    .then(json => {
      console.log(json)
    })
  }

  function makeDogRow(dog){
    let tr = document.createElement('tr')
    tr.dataset.id = dog.id
    tr.innerHTML +=  `<td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td>`
    let editTD = document.createElement('td')
    editTD.innerText = 'Edit Dog'
    editTD.addEventListener('click', editDogInForm)
    tr.appendChild(editTD)
    return tr
  }

  function editDogInForm(evt){
    let name = evt.target.parentElement.childNodes[0].innerText
    let breed = evt.target.parentElement.childNodes[1].innerText
    let sex = evt.target.parentElement.childNodes[2].innerText
    let id = evt.target.parentElement.dataset.id

    dogForm.name.value = name
    dogForm.breed.value = breed
    dogForm.sex.value = sex
    dogForm.dataset.id = id //need this to alter existing dogs

    const edittingDog = {name: name, breed: breed, sex: sex, id: id }
    // debugger
    alert(`Edit Dog Named: ${name}, breed: ${breed}, sex: ${sex} with id: ${evt.target.parentElement.dataset.id}!!`)
  }
  
  // make form event listener to make a dog to enter into to the DB
  dogForm.addEventListener('submit', updateDog)
  //initial load
  fetch(baseURL).then(res => res.json())
    .then(dogs => {
      console.log(dogs)
      dogs.forEach(dog =>{
        tableBody.appendChild(makeDogRow(dog))
      })
    })
  
})
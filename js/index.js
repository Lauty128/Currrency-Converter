 // ------------------ HEADERS 
 
 var myHeaders = new Headers(); //VER COMO UTILIZAR LOS HEADERS Y PARA QUE SIRVEN
 myHeaders.append("apikey", "3NcvTrGCviXAKErjkrX5bxQCUD0xOepm");

 var requestOptions = {
   method: 'GET',
   redirect: 'follow',
   headers: myHeaders
 };

 // ----------------------- LOAD CURRENCY TYPE TO LABEL SELECT

 let loadOptions = id=>{
  for(let country_index in country_list){
    let select = document.getElementById(id)
    let option = document.createElement("option");
    option.textContent=`$${country_index}`;
    option.value = country_index
    select.appendChild(option)
  }
}
loadOptions("value_from")
loadOptions("value_to")

// ------------------------- SUBMIT DATA TO API

let value_to = document.getElementById("value_to");
let value_from = document.getElementById("value_from");
let amount_to = document.getElementById("amount_to");
let amount_from = document.getElementById("amount_from");

document.getElementById("submitData").addEventListener("click", ()=>{
  if((amount_from.value !== "") && (amount_from.value > 0) && (value_from.value != value_to.value)){
    let url = `https://api.apilayer.com/exchangerates_data/convert?to=${value_to.value}&from=${value_from.value}&amount=${amount_from.value}`
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      let numberConvert = `${result.result / amount_from.value}`
      numberConvert = numberConvert.slice(0, numberConvert.indexOf(".")+4)
      document.getElementById("convertOne").textContent = `1 ${value_from.value} = ${numberConvert} ${value_to.value}`
      amount_to.value = result.result})
    .catch(error => console.log('error', error));
      
  }
})

// --------------------------- INFO BUTTON

let infoButton = document.getElementById("infoButton");

infoButton.addEventListener("mouseover",e=>{
  e.target.firstElementChild.classList.add ("infoButtonHover");
  e.target.firstElementChild.nextElementSibling.classList.add("infoButtonHover");
})
infoButton.addEventListener("mouseleave",e=>{
  e.target.firstElementChild.classList.remove("infoButtonHover");
  e.target.firstElementChild.nextElementSibling.classList.remove("infoButtonHover");
})
infoButton.addEventListener("click", ()=>{
  document.querySelector(".containerInformation").style.display = "flex";
  setTimeout(()=>{ document.querySelector(".contentInformation").style.opacity = "1" }, 150)
})
document.querySelector(".containerInformation").addEventListener("click",e=>{
  if(e.target.classList.value == "containerInformation"){
    document.querySelector(".contentInformation").style.opacity = "0"
    setTimeout(()=>{ document.querySelector(".containerInformation").style.display = "none"; }, 150)
  }
})









const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const select1=document.querySelector("#from");
// const select2=document.querySelector("#to");

// for (let currCode in countryList) {
//     let option=document.createElement("option");
//     option.value=currCode;
//     option.text=currCode;
//     select1.append(option);
// }
// for (let currCode in countryList) {
//     let option=document.createElement("option");
//     option.value=currCode;
//     option.text=currCode;
//     select2.append(option);
// }

const dropdowns=document.querySelectorAll(".dropdown select");

let btn=document.querySelector('#btn');

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for(let select of dropdowns) {
    for(let currCode in countryList) {
        newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOptions.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOptions.selected="selected";
        }
        select.append(newOptions); 
    }

    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);     // eve.target refers to the select means select triggers the event 
    })
}



const updateFlag=(element)=>{ 
    let currCode=element.value;
    let countryCode=countryList[currCode];  
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;       //  changes source of image
}

// btn.addEventListener('onclick',(event)=> {
//     event.preventDefault();      // prevent form from submitting when clicked on button
//     let amount=document.querySelector("#val");
//     let amtValue=amount.value;
//     console.log(amtValue);
// })


async function Shubham () {
    event.preventDefault()
    let amount=document.querySelector("#val");
    let amtValue=amount.value;
    if (amtValue==="" || amtValue<1) {
        amtValue="";
    }
    // console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data= await response.json();
    console.log(data);
}





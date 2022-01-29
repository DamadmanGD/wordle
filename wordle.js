//const axios = require('axios').default;

//const { default: axios } = require("axios");


const guessTable = document.getElementById("guess")
const guessBox = document.querySelector("#guessBox")
let guessCount=0;
let wordOfDay;
axios({
    method: "get",
    url: "http://localhost:8080/word",
})
.then((res) => {
    wordOfDay = res.data
    //alert(res.data)
    //alert(wordOfDay)
})
.catch((err) => {
    throw err;
});
//alert(wordOfDay)
//alert(wordOfDay)
  

for (i=0;i<=29;i++) {
    
    const cell = document.createElement("div")
    cell.classList.add("wordbox")
    cell.innerHTML = " "
    cell.id=`${Math.floor(i/5)}_${i-5*Math.floor(i/5)}`;
    guessTable.appendChild(cell)
}

wordForm.addEventListener("submit",(e)=> {
    const word = guessBox.value.toLowerCase();
    e.preventDefault();
    //word = word.substr(0, 1)
    const length = word.length
    

    if (length===5) {
        axios({
            method: "post",
            url: "http://localhost:8080/dictionary",
            data: {word: word},
        })
            .then((res) => {
                if (res.data) {
                    //alert("hi")
                    
                    for (i=0;i<=4;i++) {
                        //alert(wordOfDay.split("")[i])
                        const box = document.getElementById(`${guessCount}_${i}`)
                        box.innerHTML=word.split("")[i]
                        if (word.split("")[i]===wordOfDay.split("")[i]) {
                            
                            box.style.backgroundColor="green"
                        }
                        else if (wordOfDay.split("").includes(word.split("")[i])) {
                            box.style.backgroundColor="yellow"
                            //alert("life")
                        }
                        else {
                            box.style.backgroundColor="lightgray"
                        }
                    }
                    guessCount++
                    guessBox.value=""
                    if (word===wordOfDay) {
                        alert(`Congrats! You guessed the word ${wordOfDay} in ${guessCount} guesses`)
                        guessBox.parentNode.removeChild(guessBox)
                        
                    }
                    
                    
                }
                else {
                    guessBox.style.borderColor="red"
                    guessBox.value=`\"${word}\" is not a word`
                    setTimeout(()=>{
                        guessBox.style.borderColor="black"
                        guessBox.value=""
                    },500) 
                }
            })
            .catch((err) => {
                throw err;
            });
    }
    else if (length>5){
        guessBox.style.borderColor="red"
        guessBox.value="Too Long"
        setTimeout(()=>{
            guessBox.style.borderColor="black"
            guessBox.value=""
        },500) 
    } 
    else if (length<5){
        guessBox.style.borderColor="red"
        guessBox.value="Too Short"
        setTimeout(()=>{
            guessBox.style.borderColor="black"
            guessBox.value=""
        },500) 
    } 
})




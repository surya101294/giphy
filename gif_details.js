import {navbar} from "/components/navbar.js"
let navbar_div=document.getElementById("navbar")
navbar_div.innerHTML=navbar()

let Id = JSON.parse(localStorage.getItem("detailed"))
// console.log(Id)
const details= async() =>{
    try{
        let API_KEY="DzdF3O5BM2gVlhfQZNKdwjMK16dcaUji" 
        
        let response = await fetch(`https://api.giphy.com/v1/gifs/${Id}?api_key=${API_KEY}`)
        let data= await response.json()
        console.log(data.data)
        append(data.data)
    }
    catch(error){
        console.log("err:", error)
    }
}
details()
const append=(data) =>{
    let originalgif=document.getElementById("OriginalGif")
    let img=document.createElement("img")
    img.src=data.images.original.url
    let p=document.createElement("p")
    p.textContent=data.title
    originalgif.append(img, p)
    console.log(data.images.original.url)
    
}

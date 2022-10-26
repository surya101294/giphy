let API_KEY = "DzdF3O5BM2gVlhfQZNKdwjMK16dcaUji"

import {navbar} from "./components/navbar.js"
let navbar_div= document.getElementById("navbar")
navbar_div.innerHTML=navbar()
const main = async () => {
    try {
        // let API_KEY="DzdF3O5BM2gVlhfQZNKdwjMK16dcaUji"
        let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=g`)
        let data = await response.json()
        console.log(data.data)
        append(data.data)
    }
    catch (err) {
        console.log("err : ", err)
    }
}
main()

const append = async (data) => {
    data.forEach((el) => {
        // data.forEach(function (el){   //})
        let gif = document.getElementById("gif")
        let image = document.createElement("img")
        image.src = el.images.downsized.url
        image.addEventListener("click", function () {
            // gif_details(el)
            console.log("ok", el.id)
            localStorage.setItem("detailed", JSON.stringify(el.id))
            window.location.href = "gif_details.html"
        })
        gif.append(image)
    })
}
//random button'

document.getElementById("randomdata").addEventListener("click", random)
// const random=async()=> {
async function random() {
    try {
        let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`)
        let data = await response.json()
        console.log(data)

        let gif = document.getElementById("gif")
        gif.innerHTML = null
        let image = document.createElement("img")
        image.src = data.data.images.downsized.url
        image.addEventListener("click", function () {

            localStorage.setItem("detailed", JSON.stringify(data.data.id))
            window.location.href = "gif_details.html"

        })
        gif.append(image)
    }
    catch {

    }
}
//categories button
//api , URL from giphy website

// api.giphy.com/v1/gifs/categories
document.getElementById("categories").addEventListener("click", function () {
    categories()
})

const categories = async () => {
    let gif = document.getElementById("gif")
    gif.innerHTML = null;
    try {
        let response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${API_KEY}`);
        let data = await response.json();
        console.log("data is:", data.data)

        let res = await data.data
        console.log("result:", res)
        localStorage.setItem("category", JSON.stringify(res))

        let sorting_Z_A = document.createElement("button")
        sorting_Z_A.textContent = "Z-A"


        let sorting_A_Z = document.createElement('button')
        sorting_A_Z.textContent = "A-Z"
        sorting.append(sorting_Z_A, sorting_A_Z)
        let temp
        sorting_A_Z.onclick = () => {
            sorting_cat(temp = false);
        }
        sorting_Z_A.onclick = () => {
            sorting_cat(temp = true)
        }


        data.data.forEach(function (el) {
            let name = document.createElement("p")
            name = el.name
            let img = document.createElement("img")
            img.src = el.gif.images.downsized.url
            img.addEventListener("click", () => {
                localStorage.setItem("detailed", JSON.stringify(el.gif.id))
                console.log(el.gif.id)
                window.location.href = "gif_details.html"
            })
            gif.append(name, img)
        })
    } catch (error) {
        console.log("error:", error)
    }
}

const sorting_cat = (temp) => {
    let data = JSON.parse(localStorage.getItem('category'))
    console.log("res:", data)
    if (temp == true) {
        data = data.reverse()
        // data=data.name.sort((a,b)(a-b))
    }

    console.log("after sort:", data)
    let gif = document.getElementById("gif")
    gif.innerHTML = null;

    data.forEach(function (el) {
        let name = document.createElement("p")
        name = el.name
        let img = document.createElement("img")
        img.src = el.gif.images.downsized.url
        img.addEventListener("click", () => {
            localStorage.setItem("detailed", JSON.stringify(el.gif.id))
            console.log(el.gif.id)
            window.location.href = "gif_details.html"
        })
        gif.append(name, img)
    })
}
//search
document.getElementById("clickgif").onclick = () => {
    searchbar()
}

const searchbar = async () => {
    try {
        let gif = document.getElementById('gif')
        gif.innerHTML = null

        let querry = document.getElementById("searching").value


        if (querry == "")
            alert("Please provide your input")

        let res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${querry}&limit=25&offset=0&rating=g&lang=en`)
        let data = await res.json()
        console.log("sear", data.data)

        append(data.data)
        // data.data.forEach(function(el){
        //     let name= document.createElement("p")
        //     name=el.name 
        //     let img=document.createElement("img")
        //     img.src=el.gif.images.downsized.url
        //     img.addEventListener("click", ()=>{
        //         localStorage.setItem("detailed", JSON.stringify(el.gif.id))
        //         console.log(el.gif.id)
        //         window.location.href="gif_details.html"
        //     })
        //     gif.append(name, img)
        // })    
    }
    catch (err) {
        console.log("error:", err)
    }
}
//translate
key: https://api.giphy.com/v1/gifs/translate?api_key=DzdF3O5BM2gVlhfQZNKdwjMK16dcaUji&s=

`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=`

document.getElementById("translates").onclick = () => {
    translat()
}
const translat = async () => {
    try {
        let gif = document.getElementById('gif')
        gif.innerHTML = null

        let q = document.getElementById("searching").value
        let res = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${q}`)
        let data = await res.json()
        // data.data.forEach(function(el){
        // console.log("el is:",data.data)
        let img = document.createElement("img")
        img.src = data.data.images.downsized.url
        let name = document.createElement("p")
        name.textContent = data.data.name
        gif.append(name, img)
        img.addEventListener("click", () => {
            localStorage.setItem("detailed", JSON.stringify(data.data.id))
            // console.log(data.gif.id)
            window.location.href = "gif_details.html"
        })

    }
    catch (err) {
        console.log("err:", err)
    }
}



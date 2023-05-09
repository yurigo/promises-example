const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.json({hello: "world"})
})

app.get('/pikachu',  (req, res) => {
    const f = fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    console.log("1")
    f.then(response => {
        const r =  response.json()
        console.log("response.json:" , r);
        return r;
    }).then(data => {
        res.json(data)
    })
    console.log("2")
    
    console.log("fetch:" , f);
})

// output: 
// 1
// 2
// fetch: Promise { <pending> }
// response.json: Promise { <pending> }

async function fetchPokemonsInAFor(ids){
    const result = []
    for (let i = 0 ; i < ids.length ; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${ids[i]}`;
        const response = await fetch(url);
        const data = await response.json();
        result.push(data);
    }
    return result;
}

async function fetchPokemons(ids){
    const urls = ids.map(id => `https://pokeapi.co/api/v2/pokemon/${id}`)
    const fetches = urls.map(url => fetch(url))
    const responses = await Promise.all(fetches);
    const responsePromises = responses.map(response => response.json())
    const datas = await Promise.all(responsePromises);
    return datas;
}

const pokemons = [
    "pikachu",
    "bulbasaur",
    "charmander",
    "ivysaur",
    "venusaur",
    "magikarp",
    "caterpie",
    "kakuna",
    "pidgey",
    "pidgeotto",
    "rattata",
    "raticate"
]

app.get('/all', async (req, res) => {
    console.time()
    res.json(await fetchPokemons(pokemons))
    console.timeEnd()
  })

  app.get('/for', async (req, res) => {
    console.time()
    res.json(await fetchPokemonsInAFor(pokemons))
    console.timeEnd()
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}`)
  console.log(`http://localhost:${port}/pikachu`)
  console.log(`http://localhost:${port}/for`)
  console.log(`http://localhost:${port}/all`)
})
const DeleteRecipe = async (id) => {
    console.log("aa")
    await fetch(`http://localhost:3001/recipe/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(json => {
            console.log(json)
        })
}

module.exports = { DeleteRecipe }
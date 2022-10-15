const registerFunc = async (name, email, password) => {
    await fetch(`http://localhost:3001/user/getByEmail/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then((data) => {
            if (data.length > 0) {
                alert("User already exist")
            }
            else {
                fetch(`http://localhost:3001/user`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data)
                        alert("User created")
                    })
            }
        })
}

const loginFunction = async (email, password) => {
    await fetch(`http://localhost:3001/user/getByEmail/${email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/jsonS'
            },
        })
        .then(res => res.json())
        .then((data) => {
            if (data.length > 0) {
                if (data[0].password === password) {
                    alert("Login successful")
                }
                else {
                    alert("Wrong password")
                }
            }
            else {
                alert("User does not exist")
            }
        })

}

module.exports = { registerFunc, loginFunction }
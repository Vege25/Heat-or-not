//TODO get car likes and username from database and display it in ranking with for loop.

const getLikes = async () => {
    const response = await fetch(`${env.baseUrl}/like`);
    const json = await response.json();
    if (response.status >= 400) {
        console.error("Failed to fetch likes", {
            status: response.status,
            error: json,
        })
        return []
    }
    json.sort((a, b) => b.likes - a.likes);
    return json;
}

const getCar = async (id) => {
    const response = await fetch(`${env.baseUrl}/car/${id}`);
    const json = await response.json()
    if (response.status >= 400) {
        console.error("Failed to fetch car details for " + id, {
            status: response.status,
            error: json,
        })
        return undefined
    }
    return json;
}

const getRankings = async () => {
    const likes = await getLikes();
    const cars = await Promise.all(likes.map(({CarID}) => getCar(CarID)));
    return likes.map((like, i) => ({
        likes: like.likes,
        car: cars[i]
    })).filter((ranking) => !!ranking.car)
}

const createCarSection = (car) => {
    const carDiv = document.createElement("div");
    carDiv.setAttribute('class', 'car');

    //image
    // const imageElem = document.createElement("img");
    // imageElem.src = `/${car.Image}`;
    // profileDiv.appendChild(imageElem);

    const nameH3 = document.createElement("h3");
    nameH3.setAttribute('class', 'name');
    nameH3.innerText = `${car.Brand} ${car.Model}`
    carDiv.appendChild(nameH3);

    const usernameDiv = document.createElement("div");
    usernameDiv.setAttribute('class', 'username');
    usernameDiv.innerText = car.Username;
    carDiv.appendChild(usernameDiv);

    return carDiv;
}

const createLikesSection = (likes) => {
    const likesDiv = document.createElement("div");
    likesDiv.setAttribute('class', 'likes');

    const fireIconI = document.createElement("i");
    fireIconI.setAttribute('class', 'fa-solid fa-fire');
    likesDiv.appendChild(fireIconI);

    // likes value
    const likesNumberDiv = document.createElement("div");
    likesNumberDiv.setAttribute('class', 'likes-value');
    likesNumberDiv.innerText = likes;
    likesDiv.appendChild(likesNumberDiv);

    return likesDiv;
}

const createProfileSection = (car) => {
    const profileDiv = document.createElement("div");
    profileDiv.setAttribute('class', 'user');
    /*
       const contact = document.createElement("div");
       contact.setAttribute('class', 'contact');
       //link to profile
       const linkToProfile = document.createElement("a");

       contact.appendChild(linkToProfile);
       line.appendChild(contact);
   */

    return profileDiv;
}

getRankings().then((rankings) => {
    console.log('rankings', rankings)

    const listContainer = document.querySelector(".list_container");

    const listDiv = document.createElement("div");
    listDiv.setAttribute('class', 'list');
    listContainer.appendChild(listDiv);

    rankings.forEach(({likes, car}) => {
        const lineDiv = document.createElement("div");
        lineDiv.setAttribute('class', 'line');
        lineDiv.appendChild(createCarSection(car));
        lineDiv.appendChild(createLikesSection(likes));
        // TODO: profile link?
        // lineDiv.appendChild(createProfileSection(car));

        listDiv.appendChild(lineDiv);
    })
})

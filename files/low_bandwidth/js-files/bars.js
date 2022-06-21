document.addEventListener("DOMContentLoaded", function (event) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(position)
        fetch('/api/bars/json', {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                latitude: latitude,
                longitude: longitude
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
            .then(bars => {
                let container = document.createElement('div');
                document.querySelector('main').append(container);
                container.className = "container";


                let rowdiv = document.createElement('div');
                container.append(rowdiv);
                rowdiv.className = "row justify-content-center t";
                for (let bar of Array.from(bars.bars)) {
                    let div = document.createElement('div');
                    rowdiv.append(div);
                    div.className = "col-8 border";

                    let divBarName = document.createElement('div');
                    div.append(divBarName);
                    divBarName.className = 'row justify-content-center';

                    let barName = document.createElement('h1');
                    divBarName.append(barName);
                    barName.innerHTML = bar.name;
                    barName.className = "barHeader";

                    let divBarImage = document.createElement("div");
                    div.append(divBarImage);
                    divBarImage.className = "row justify-content-center";

                    let a = document.createElement('a');
                    divBarImage.append(a);
                    a.href = "bar-details.html?id=" + bar.place_id;
                    a.className = "linkImages";
                    a.innerHTML = "Click here for Details";

                    let totalRatings = document.createElement("div");
                    div.append(totalRatings);
                    totalRatings.className = "row justify-content-center";

                    let total = document.createElement("p");
                    totalRatings.append(total);
                    
                    if (bar.user_ratings_total != undefined) {
                        total.innerHTML = bar.user_ratings_total + " Bewertungen";
                    } else {
                        total.innerHTML = "0 Bewertungen";
                    }

                }
            }).catch(err => console.error(`Fetch problem: ${err.message}`));
    });
});
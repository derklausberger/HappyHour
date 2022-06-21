
document.addEventListener("DOMContentLoaded", function (event) {
    let parser = new URLSearchParams(window.location.search);
    fetch('/api/bar/' + parser.get("id"))
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(bar => {
            // heading
            let barH2 = document.createElement("h2");
            barH2.innerHTML = bar.name;
            let topLeft = document.getElementById("topLeft");
            topLeft.append(barH2);

            // review
            let reviewDiv = document.createElement("div");
            let bottomRight = document.getElementById("bottomRight");
            bottomLeft.appendChild(reviewDiv);

            let p = document.createElement("p");
            reviewDiv.append(p);
            p.innerHTML = bar.rating + " out of 5 Stars";

            // address
            let address = document.createElement("address");
            let addressLabel = document.createElement("p");
            addressLabel.innerHTML = "ADDRESS";

            addressLabel.id = "addressLabel";
            bottomLeft.append(addressLabel);
            address.innerHTML = bar.vicinity;
            address.id = "address";
            addressLabel.append(address);
            bottomLeft.append(addressLabel);

            // opening hour
            let openingHoursDiv = document.createElement("p");
            openingHoursDiv.id = "openingHoursDiv";
            let openingHoursLabel = document.createElement("p");
            openingHoursLabel.innerHTML = "OPENING HOURS";
            openingHoursLabel.id = "openingHoursLabel";
            openingHoursDiv.append(openingHoursLabel);
            
            if (bar.opening_hours == undefined) {
                let openingHours = document.createElement("p");
                    openingHours.id = "openingHours";
                    openingHours.innerHTML = "No opening hours available.";
                    openingHoursDiv.append(openingHours);
            } else {
                for (let i = 0; i < 7; i++) {
                    let openingHours = document.createElement("p");
                    openingHours.id = "openingHours";
                    openingHours.innerHTML = bar.opening_hours.weekday_text[i];
                    openingHoursDiv.append(openingHours);
                }
            }

            bottomRight.append(openingHoursDiv);

        }).catch(err => console.error(`Fetch problem: ${err.message}`));
})

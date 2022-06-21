
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

            // picture
            let barPic = document.createElement("img");
            barPic.src = bar.img_url;
            barPic.id = "barPic";
            let bottomLeft = document.getElementById("bottomLeft");
            bottomLeft.appendChild(barPic);
            var mybr = document.createElement('br');
            bottomLeft.append(mybr);

            var br = document.createElement("br");
            bottomLeft.append(br);

            // review
            let reviewDiv = document.createElement("div");
            let bottomRight = document.getElementById("bottomRight");
            bottomLeft.appendChild(reviewDiv);

            let starSpan, revCnt = bar.rating;
            for (let i = 1; i <= 5; i++) {
                starSpan = document.createElement("span");
                reviewDiv.append(starSpan);
                starSpan.className = "star fa fa-star";

                if (revCnt < 1) {
                    let id = "star" + i;
                    starSpan.id = id;
                    document.styleSheets[0].insertRule("#" + id + ":after{width:" + revCnt * 30 + "px;}", 0);
                    revCnt = 0;
                } else {
                    revCnt--;
                }
            }

            var newbr = document.createElement('br');
            bottomLeft.append(newbr);



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
            
            if (bar.opening_hours.weekday_text == undefined) {
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

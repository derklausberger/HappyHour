
document.addEventListener("DOMContentLoaded", function (event) {
    let parser = new URLSearchParams(window.location.search);
            console.log(parser.get("id"));
    fetch('/api/cocktails/'+ parser.get("id")) // + parser.get("id")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(cocktail => {
            // heading
            let barH2 = document.createElement("h2");
            barH2.innerHTML = "BarName";
            let topLeft = document.getElementById("topLeft");
            topLeft.append(barH2);

            // picture
            let barPic = document.createElement("img");
            barPic.src = "/images/bar.jpeg";
            barPic.id = "barPic";
            let bottomLeft = document.getElementById("bottomLeft");
            bottomLeft.appendChild(barPic);
            var mybr = document.createElement('br');
            bottomLeft.append(mybr);

            // icon on button
            let icon = document.createElement("img");
            icon.src = "/images/heartEmpty.jpg";
            icon.id = "heart";
            let likeButton = document.createElement("button");
            likeButton.id = "likeButton";
            likeButton.append(icon);
            bottomLeft.appendChild(likeButton);

            // review
            let review = document.createElement("p");
            review.innerHTML = "Hier steht eine Bewertung";
            let bottomRight = document.getElementById("bottomRight");        
            bottomRight.appendChild(review);
            var newbr = document.createElement('br'); 
            bottomRight.append(newbr);
            
            // address
            let address = document.createElement("address");
            // website if existing
            address.innerHTML = "Fifth Avenue, NY, USA";
            bottomRight.append(address);
            
        
    }).catch(err => console.error(`Fetch problem: ${err.message}`));
})

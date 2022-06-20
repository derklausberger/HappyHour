
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

            // no picture
            
            let bottomLeft = document.getElementById("bottomLeft");
            bottomLeft.appendChild(barPic);
            

            // no icon on button
            
            let likeButton = document.createElement("button");
            likeButton.id = "likeButton";
            likeButton.innerHTML = "LIKE";
            bottomLeft.appendChild(likeButton);

            // review
            /*
            let reviewDiv = document.createElement("div");
            let bottomRight = document.getElementById("bottomRight");
            bottomRight.appendChild(reviewDiv);
            */

            /* no rating just address
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
                
            }*/
            var newbr = document.createElement('br');
            bottomRight.append(newbr);

            // address
            let address = document.createElement("address");
            // website if existing
            address.innerHTML = "Address: " + bar.vicinity;
            bottomRight.append(address);


        }).catch(err => console.error(`Fetch problem: ${err.message}`));
})

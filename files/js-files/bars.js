document.addEventListener("DOMContentLoaded", function (event) {
    fetch('/api/bars')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(bars => {
            let cnt = 0;
            let cnt2 = 0;
            for (let bar of Array.from(bars)) {
                /*
                <div class="row">
                    <div class="col-sm">
                        <section>
                            <h2>Loco</h2>
                            <img src="images/loco.png" alt="LocoBar" height="230px" width="230px">
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                    </p>
                    <a href="bar-details.html">Read more...</a><br><br>
                        </section>
                    </div>
    
                    <div class="col-sm">
                        <section>
                            <br><br><p>ADRESSE</p>
                            <p>BEWERTUNGEN</p>
                            <input type="button" value="Like!"></input>
                        </section>
                    </div>
                </div>
                */
                let div = document.createElement('div');
                if (cnt == 0 || cnt % 3 == 0){
                    document.querySelector('main').appendChild(div);
                }
                div.className = 'row rowClass';
                
                let divs = document.getElementsByClassName("rowClass");
                let div2 = document.createElement('div');
                //div.appendChild(div2);
                if (cnt < 3){
                    divs[0].appendChild(div2);
                } else if (cnt < 6){
                    divs[1].appendChild(div2);
                } else if (cnt < 9){
                    divs[2].appendChild(div2);
                } else if (cnt < 12){
                    divs[3].appendChild(div2);
                } else if (cnt < 15){
                    divs[4].appendChild(div2);
                } else if (cnt < 18){
                    divs[5].appendChild(div2);
                } else if (cnt < 21){
                    divs[6].appendChild(div2);
                } else {
                    divs[0].appendChild(div2);
                }
                div2.className = 'col-4 text-center';

                let article = document.createElement('article');
                div2.append(article);
                article.className = "divsBars"

                let h2 = document.createElement('h3');
                article.append(h2);
                h2.innerHTML = bar[1].name;
                h2.className = "h2Article";

                let div3 = document.createElement("div");
                div3.className = "row";
                article.append(div3);

                let div4 = document.createElement("div");
                div4.className = "col";
                div3.append(div4);

                let img = document.createElement('img');
                div4.append(img)
                //article.append(img);
                //replaced this
                //img.src = bar[1].img_url;
                //with this
                img.src = 'https://www.25hours-hotels.com/images/25h_bikini_stephanlemke_monkey_bar_people_medium_77_175080046444e25d59d72eb3.jpg';
                //to reduce api calls for google api
                img.alt = 'alt';
                img.width = '300';
                img.height = '200';
                img.className = "imgArticle";
                
                let div5 = document.createElement("div");
                div5.className = "col text-left";
                div3.append(div5);
                

                let p = document.createElement('p');
                div5.append(p);
                //article.append(p);
                //p.innerHTML = 'rating (4.8/5 stars), rating count, address, more than 1 photo?, place holder photo?';
                p.innerHTML = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
                p.className = "pArticle";
                cnt = cnt +1;
            }
        }).catch(err => console.error(`Fetch problem: ${err.message}`));
});
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
                h2.innerHTML = bar.name;
                h2.className = "h2Article";

                let div3 = document.createElement("div");
                div3.className = "row";
                article.append(div3);

                let div4 = document.createElement("div");
                div4.className = "col";
                div3.append(div4);

                
                
                let div5 = document.createElement("div");
                div5.className = "col text-left";
                div3.append(div5);
                

                let p = document.createElement('p');
                div5.append(p);
                //article.append(p);
                p.innerHTML = "";
                p.className = "pArticle";

                let a = document.createElement('a');
                div4.append(a);
                a.innerHTML = 'More Details';
                a.href = "bar-details.html?id=" + bar.place_id;

                cnt = cnt +1;
            }
        }).catch(err => console.error(`Fetch problem: ${err.message}`));
});
async function buildTokenStats (){
    const contentContainer = document.getElementById("app-content");

    contentContainer.innerHTML = `  
    <div class="app-content-header">
    <h1 class="app-content-headerText">Accounts</h1>
  
    <button class="mode-switch" title="Switch Theme">
      <svg class="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
      <defs></defs>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
      </button>
  </div>
  
  <div class="app-content-actions">
    <input class="search-bar" placeholder="Search..." type="text">
    <div class="app-content-actions-wrapper">
      <div class="filter-button-wrapper">
        <button class="action-button filter jsFilter"><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></button>
        <div class="filter-menu">
          <label>Category</label>
          <select>
            <option>All Categories</option>
            <option>Category 1</option>                     
            <option>Category 2</option>
            <option>Category 3</option>
            <option>Category 4</option>
          </select>
          <label>Status</label>
          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Disabled</option>
          </select>
          <div class="filter-menu-buttons">
            <button class="filter-button reset">
              Reset
            </button>
            <button class="filter-button apply">
              Apply
            </button>
          </div>
        </div>
      </div>
  
      <button class="action-button list active" title="List View">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      </button>
      <button class="action-button grid" title="Grid View">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      </button>
  
    </div>
  </div>
  <div style="display:flex" id = "insertArea">
  
  </div> 
  <br>
  <div class="products-area-wrapper tableView">
    <div class="products-header">
      <div class="product-cell image">
        Items
        <button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button>
      </div>
      <div class="product-cell category">Category<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
      <div class="product-cell status-cell">Status<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
      <div class="product-cell sales">Sales<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
      <div class="product-cell stock">Stock<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
      <div class="product-cell price">Price<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
    </div>
    <div id = "insertArea2">
  
    </div> 
  </div>
  `;
  
    //Uses Covalent API
    const API_KEY = 'ckey_d0ff1edb20b341e1a5c1ad2cbf1';
    const supportedChains = ['1', '137', '56', '43114', '250']; //Ethereum, Binance, Polygon, Avalanche, Fantom(Not in order)
  
    //let chain_id = '1';
    let user = Moralis.User.current();
  
    let insertArea = document.getElementById('insertArea');
    let insertArea2 = document.getElementById('insertArea2');
  
    let address = user.attributes.accounts[0];
    console.log('User has '+user.attributes.accounts.length+' account addresses linked.')
    for (let i = 0; i < user.attributes.accounts.length; i++) 
  {
    console.log(user.attributes.accounts[i]);
    let accountCard = document.createElement('div');
    accountCard.classList.add('card');
    accountCard.innerHTML = `<h4>${user.attributes.accounts[i]}</h4>`;
    insertArea.appendChild(accountCard);         
  
  }
  
  
    //contentContainer.innerHTML= buildLoader();
    let allTokens = document.createElement('div');
  
    for (let i = 0; i < supportedChains.length; i++) 
  {
  
    fetch('https://api.covalenthq.com/v1/'+supportedChains[i]+'/address/'+address+'/balances_v2/?key='+API_KEY+'')
    .then((response) => {
    return response.json();
    })
    .then((myJson) => {
    let titleItem = document.createElement('div');
    let name;
    let color;
    if(myJson.data.chain_id == '1'){name = 'Ethereum'; color = '#24242493; background-color: #716b9496';}
    if(myJson.data.chain_id == '137'){name = 'Polygon'; color = '#24242493; background-color: #add8e696';}
    if(myJson.data.chain_id == '56'){name = 'Binance Smart Chain'; color = '#24242493; background-color: #ffff0096';}
    if(myJson.data.chain_id == '43114'){name = 'Avalanche'; color = '#24242493; background-color: #FF000096';}
    if(myJson.data.chain_id == '250'){name = 'Fantom'; color = '#24242493; background-color: #1969FF96';}
  
      for (var i = 0; i < myJson.data.items.length; i++) 
      {
        let object = myJson.data.items[i];
        console.log(object);
        let actualBalance = object.balance / (10 ** object.contract_decimals);
        let listItem = document.createElement('div');
        listItem.classList.add('products-row');
        //listItem.addEventListener('click',  function() {streamAudiusTrack(object.id)});
        let under_logo = object.logo_url;
        if(under_logo == 'error'){console.log('null')}
        listItem.addEventListener.onclick = getCurrentTokenStats('${object.contract_address}');
        listItem.innerHTML = `
          <div class="product-cell">
          <img onerror="imgError(this)" style="border-radius:100%;" src="${object.logo_url || ""}"></img>
          ${object.contract_name || "-"}</div>
          <div class="product-cell">${actualBalance || "-"} ${object.contract_ticker_symbol || ""}</div>
          <div class="product-cell">${object.quote_rate || ""}</div>
          <div class="product-cell">${object.quote || "-"} ${myJson.data.quote_currency || "-"}</div>
        `;
        allTokens.appendChild(listItem);         
    
    
      }
    
      //
     
    
    });
  
  }  
  insertArea2.appendChild(allTokens);         
  
          
  }
  
  async function getCurrentTokenStats (input){
    const contentContainer = document.getElementById("app-content");

    //Uses Covalent API
    const API_KEY = 'ckey_d0ff1edb20b341e1a5c1ad2cbf1';
    //const supportedChains = ['1', '137', '56', '43114', '250'];
  
    //let chain_id = '1';
    let user = Moralis.User.current();
    let chainID = await web3.eth.net.getId();
    let address = input;
    //contentContainer.innerHTML= buildLoader();
    contentContainer.innerHTML = ``;
  
    let today = new Date();
    let date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
    console.log(date);
    let beforeDate = (today.getFullYear()) +'-'+("0" + (today.getMonth() + 1-3)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
    console.log(beforeDate);
  
    fetch('https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/'+chainID+'/usd/'+address+'/?from='+beforeDate+'&to='+date+'&key='+API_KEY+'')
    .then((response) => {
    return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      console.log(myJson.data[0].prices.length);
      let prices = [];
      let dates = [];
      for (var i = 0; i < myJson.data[0].prices.length; i++) 
  {
    let object = myJson.data[0].prices[i];
    prices.push(object.price);
    dates.push(object.date);
  
  }
      let element = document.createElement('div');
      element.innerHTML = `
      <div>
        <canvas style="color:white" id="myChart"></canvas>
      </div>
      
      <div class="slidecontainer">
        <input style="width:100%" name="time" type="range" min="3" max="${myJson.data[0].prices.length - 1}" value="7" class="slider" id="myRange">
      </div>
      `;
      contentContainer.appendChild(element);
      priceHistory(address, prices, dates);
      document.getElementById("myRange").onchange = function () {
        priceHistory(address, prices, dates);
      };
      let newsToken = object.symbol;
      fetch('https://api.lunarcrush.com/v2?data=feeds&limit=20&sources=news'+'&symbol='+newsToken+'&key=zmbl4k31m1fgum0y8l016')
    
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let news = document.createElement('div');
        news.innerHTML = `<h2>Top Stories</h2>`;
        contentContainer.appendChild(news);
        for (var i = 0; i < myJson.data.length; i++) 
      {
        let object = myJson.data[i];
        var listItem = document.createElement('a');
        listItem.innerHTML = 
        `
        <div class="tokenCard">
          <div style="float:left;height:50px; width:75px; background-size:contain; overflow:hidden; background-repeat:no-repeat;background-image: url('${object.thumbnail || ""}')"" >
          </div
          <div>
            <h3 style="float:right;">${object.sentiment || ""} ${object.name || ""}</h3>
            <h3>${object.title || ""}</h3>
            <small>${object.description || ""}</small>
            <div style="display:flex; float:right"><h4>${object.shares || ""} Shares </h4></div>
          </div>
        <div>
        `;
        contentContainer.appendChild(listItem); 
        var breakItem = document.createElement('br');
  
        contentContainer.appendChild(breakItem);   
      }
  
      });
  
  
  
    });
          
  }
   async function priceHistory(token, _prices, _dates) {
  
        let days = document.getElementById('myRange').value;
        let i = token;
  
        let dates = _dates.slice(0, days).reverse();
        let prices = _prices.slice(0, days).reverse();
  
        const data = {
          labels: dates,
          datasets: [{
          label: "Token Price",
          backgroundColor: '#19da00',
          borderColor: '#19da00',
          defaultFontColor: '#19da00',
          data:prices,
          }]
        };
  
        const config = {
          type: 'line',
          data: data,
          options: {  
              defaultFontColor: '#19da00'
        }
        };
  
        if(window.myChart instanceof Chart){
          myChart.destroy()
        }
  
        window.myChart = new Chart(
          document.getElementById('myChart'),
          config
        );
  
      }
  
  
  
  
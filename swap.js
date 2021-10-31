

  function buildSwap() {
    let contentContainer = document.getElementById('app-content');
    contentContainer.innerHTML = `
    
        <div id="window">
            <h4>Swap</h4>
            <div id="form">
                <div class="swapbox">
                <h4>From</h4>
                <div class="swapbox_select token_select" id="from_token_select">
                    <img src="/images/question.png" id="from_token_img" onerror="imgError(this)" class="token_image">
                    <span id="from_token_text">Select Token</span>
                </div>
                
                <div class="swapbox_select">
                    <input class="number form-control" placeholder="amount" id="from_amount">
                </div>
                </div>
                <div class="swapbox">
                <h4>To</h4>
                <div class="swapbox_select token_select"  id="to_token_select">
                    <img src="/images/question.png" id="to_token_img" onerror="imgError(this)" class="token_image">
                    <span id="to_token_text">Select Token</span>
                </div>
                <div class="swapbox_select">
                    <input class="number form-control" placeholder="amount" id="to_amount">
                </div>
                    
                </div>
                <button disabled class="btn btn-large btn-primary btn-block" id="swap_button">
                Swap
                </button>
                <div style="float:right">Estimated Gas: <span id="gas_estimate"></span></div>
            </div>
        </div>
        <br><br>
        <div style="width:500px;background-color:white;outline:2px solid white;">
        <p><img src="https://protocol.0x.org/en/latest/_images/logo.svg" style="width:25px;"> Swap with 0x</p>
        <hr>
          <small>Our Dex ties into the best deals. Try it out and see for yourself.</small>
        </div>
    

<div class="modal" id="token_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <button id="modal_close" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h5 class="modal-title">Select token</h5>
 
        </div>
        <div class="modal-body">
          <div style="width:500px" id="token_list"></div>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById("modal_close").onclick = closeModal;
  document.getElementById("from_token_select").onclick = (() => {openModal("from")});
  document.getElementById("to_token_select").onclick = (() => {openModal("to")});
  document.getElementById("from_amount").onblur = getQuote;
  document.getElementById("swap_button").onclick = trySwap;
  
  listAvailableTokens();
  
  }

let currentTrade = {};
let currentSelectSide;
let tokens;
console.log(currentTrade);

async function listAvailableTokens(){

let url = 'https://ropsten.api.0x.org';
let endpoint = '/swap/v1/tokens';
  
  fetch(url+endpoint)
  .then((response) => {
  return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
    console.log(myJson.records.length);
    console.log(myJson[0]);
    tokens=[];
    //let usdt = {address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6, name: 'Tether USD', symbol: 'USDT'};
    //tokens.push(usdt);
    for (var i = 0; i < myJson.records.length; i++) 
    {
      let object = myJson.records[i];
      tokens.push(object); //adds in 0x tokens
    }


    let parent = document.getElementById("token_list");
    for( const address in tokens){
        let token = tokens[address];
        let div = document.createElement("div");
        div.setAttribute("data-address", address)
        div.className = "tokenCard-swap";
        let logo = 'https://logos.covalenthq.com/tokens/1/'+token.address+'.png';
        div.innerHTML = `
        <img onerror="imgError(this)" class="token_list_img" src="${logo}">
        <span class="token_list_text">${token.symbol}</span>
        `;
        div.onclick = (() => {selectToken(address)});
        parent.appendChild(div);
    }
  });

}

function selectToken(address){
  closeModal();
  console.log(tokens);
  currentTrade[currentSelectSide] = tokens[address];
  console.log(currentTrade);
  renderInterface();
  getQuote();
}

function renderInterface(){
  if(currentTrade.from){
    if(currentTrade.from.symbol == 'VERSE')
    {
      document.getElementById("from_token_img").src = '/images/question.png';
    }
    else
    {
      document.getElementById("from_token_img").src = 'https://logos.covalenthq.com/tokens/1/'+currentTrade.from.address+'.png';
    }
      document.getElementById("from_token_text").innerHTML = currentTrade.from.symbol;
  }
  if(currentTrade.to){
    if(currentTrade.to.symbol == 'VERSE')
    {
      document.getElementById("to_token_img").src = '/images/question.png';
    }
    else
    {
      document.getElementById("to_token_img").src = 'https://logos.covalenthq.com/tokens/1/'+currentTrade.to.address+'.png';

    }
      document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
  }
}

function openModal(side){
  currentSelectSide = side;
  document.getElementById("token_modal").style.display = "block";
}
function closeModal(){
  document.getElementById("token_modal").style.display = "none";
}

async function getQuote(){
  if(!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;
  
  let amount = Number( 
    (document.getElementById("from_amount").value * 10**currentTrade.from.decimals) 
  )
  console.log('Amount:', amount);
  let url = 'https://ropsten.api.0x.org';
  let endpoint = '/swap/v1/quote?';

  fetch(url+endpoint+'buyToken='+currentTrade.to.address+'&sellToken='+currentTrade.from.address+'&sellAmount='+amount+'&slippagePercentage=1')//+'&includedSources=shibaswap'
  .then((response) => {
  return response.json();
  })
  .then((myJson) => {
    quote = myJson;
    console.log(quote);
    document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
    document.getElementById("to_amount").value = quote.buyAmount / (10**currentTrade.to.decimals);
    document.getElementById("swap_button").disabled = false;
  });

}

async function trySwap(){
  await Moralis.Web3.enableWeb3();
  let user = Moralis.User.current();

  
  if(currentTrade.from.symbol !== "ETH"){


    //Get token allowance
    const options = {
      chain: 'ropsten',
      owner_address: user.attributes.ethAddress,
      spender_address: quote.allowanceTarget,
      address: currentTrade.from.address
    };
    const allowance = await Moralis.Web3API.token.getTokenAllowance(options);
    console.log('allowance', allowance);
    
    if(allowance.allowance < quote.sellAmount){

     console.log('You have not set enough allowance for this token');
      const ABI = [
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
      ];
      
      const options = {
        contractAddress: currentTrade.from.address,
        functionName: "approve",
        abi: ABI,
        params: {
          spender: quote.allowanceTarget,
          amount: quote.sellAmount
        },
      };
      
      const receipt = await Moralis.executeFunction(options);
      console.log(receipt)
      return;
    }
    
    
  }
  try {
      let receipt = await doSwap(quote);
      console.log(receipt);
      alert("Swap Complete: "+ receipt);
  
      } 
  catch (error) {
      alert('ERROR: '+error.message);
  }
    


}

async function doSwap(quote){
  let contentContainer = document.getElementById('app-content');
  contentContainer.innerHTML = ``;
  let web3 = await Moralis.Web3.enableWeb3();

  let user = Moralis.User.current();
  quote.from = user.attributes.ethAddress;
  console.log('Try Transaction', quote);
  
  let results = await web3.eth.sendTransaction(quote);
  contentContainer.innerHTML = `
  <div class="tokenCard" style="display:block; width:fit-content">
  <h3>Transaction Results</h2><hr>
  <p>Block Hash: ${results.blockHash}</p><br>
  <p>Block Number: ${results.blockNumber}</p><br>
  <p>Cumulative Gas Used: ${results.cumulativeGasUsed}</p><br>
  <p>Effective Gas Price: ${results.effectiveGasPrice}</p><br>
  <p>From: ${results.from}</p><br>
  <p>To: ${results.to}</p><br>
  <p>Transaction Hash: <a href="https://etherscan.io/tx/${results.transactionHash}">${results.transactionHash}</a></p>
  </div>`;

}



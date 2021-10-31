const serverUrl = "https://nrvwo8eitm16.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "KR1IxLiBTFAxLjxWWtOxBwBbQqDUstbHHNFpRrt3"; // Application id from moralis.io
Moralis.start({ serverUrl, appId });




function listenForAccountChange() {
  Moralis.onAccountsChanged(async function (accounts) {
    console.log("account changed:", accounts);
    const user = Moralis.User.current();
    if (!user || !accounts.length) {
      // not logged in
      return;
    }

    try {
      const address = accounts[0];
      if (addressAlreadyLinked(user, address)) {
        console.log(`address ${getAddressTxt(address)} already linked`);
        return;
      }

      const confirmed = confirm("Link this address to your account?");
      if (confirmed) {
        await Moralis.link(address);
        alert("Address added!");
        render();
      }
    } catch (error) {
      if (error.message.includes("already used")) {
        alert("That address is already linked to another profile!");
      } else {
        console.error(error);
        alert("Error while linking. See the console.");
      }
    }
  });
}



async function onAddAddress() {
  try {
    // enabling web3 will cause an account changed event
    // which is already subscribed to link on change so
    // just connecting Metamask will do what we want
    // (as long as the account is not currently connected)
    await Moralis.enableWeb3();
  } catch (error) {
    console.error(error);
    alert("Error while linking new address. See console");
  }
}


  
async function toggle(id) {
    var x = document.getElementById(id);
    console.log(id);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
    
  function imgError(image) {
    image.onerror = "";
    image.src = "https://cdn.pixabay.com/photo/2016/10/18/18/19/question-mark-1750942_960_720.png";
    return true;
  }
  

  function buildLoader() {
    return `
    <center><div class="loader"></div></center>`
    ;
  }
  
  



function buildSideComponent(user) {
    return `
  
    <div class="sidebar">
    <div class="sidebar-header">
      <div class="app-icon">
        <h3>Logo</h3>
      </div>
    </div>
    <ul class="sidebar-list">
      <li class="sidebar-list-item active">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span onclick="buildHome()">Dashboard</span>
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span onclick="toggle('productsTab')">Products +</span>
        </a>
      </li>
  
      <div id="productsTab" style="display:none">
      <li class="sidebar-list-item">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span onclick="buildTest()">Inventory</span>
        </a>
      </li>
      </div>
      <li class="sidebar-list-item">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span onclick="toggle('transTab')">Transactions +</span>
        </a>
      </li>
      <div id="transTab" style="display:none">
  
      <li class="sidebar-list-item">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          <span onclick="buildTokenStats()">--Accounts</span>
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
          <span>--Sales</span>
        </a>
      </li>
      <li class="sidebar-list-item">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span>--Expenses</span>
        </a>
      </li>
      </div>
      <li class="sidebar-list-item">
      <a href="#">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span onclick="toggle('contactsTab')">Contacts +</span>
      </a>
    </li>
    <div id="contactsTab" style="display:none">
    <li class="sidebar-list-item">
    <a href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span>--Customers</span>
    </a>
  </li>
  <li class="sidebar-list-item">
  <a href="#">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    <span>--Employees</span>
  </a>
  </li>
  <li class="sidebar-list-item">
  <a href="#">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    <span>--Suppliers</span>
  </a>
  </li>
  </div>
  
  <li class="sidebar-list-item">
  <a href="#">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    <span>Reports</span>
  </a>
  </li>
  
  </ul>
  
  
    <div class="account-info">
      <div class="account-info-picture">
        <img src="https://lh3.googleusercontent.com/vZ0ypdEXKVoRjZX0-z2sLlCv3K5D4aBCcsLr6BkLhVGXOG6e0vT1UUqcsIsfZ1ANyPBLm1r-ALUJvGVJFjZW843wg62zII8tNo2LVg=w600" alt="Account">
      </div>
      <div class="account-info-name">${user.attributes.username}</div>
      <button class="account-info-more">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </button>
    </div>
  </div>
  `;
  }
  
  
  
  
  

  
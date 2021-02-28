export const spotView = (spot) => {
  let deleteButtonHTML = '';
  if (spot.canBeDeleted) {
    deleteButtonHTML = '<button class="button is-fullwidth">DELETE</button>';
  }

  let imgHTML = '<img src="../img/noimg.png" alt="No image"></img>';
  if (spot.image) {
    imgHTML = `<img src="${spot.image}" alt="Placeholder image">`;
  }
    return `  
    <div class="ad-data">
    <div class="ad-image">
    ${imgHTML}
    </div>
     <div class="ad-info">
       <div class="ad-main-info">
        <p>${spot.productName}</p>
      </div>
      <div class="ad-state">
         <p>${spot.status}</p>
         </div>
         <div class=ad-decription>
           <p>${spot.description}</p>
         </div>
         <div class=ad-decription>
           <p>${spot.user.username}</p>
         </div>
      <div class="ad-price">
        <p>${spot.price} €</p> 
    </div>
    <br>
        ${deleteButtonHTML}
        </div>
        `;
  };
// 
  export const errorView = (errorMessage) => {
    return `<div class="message is-danger">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        ${errorMessage}
      </div>
    </div>`
  }

export const feedbackView = () => {
  return `<div class="columns is-mobile is-centered">
  <div class="column is-two-fifths">
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="../img/ok.jpg">
      </figure>
    </div>
    <div class="card-content">
      <div class="content has-text-centered">
        <p><strong>Operation success</strong></p>
      </div>
    </div>
  </div>
  </div>
  </div>`
}

export const noSpotsView = () => {
  return `<div class="columns is-mobile is-centered mt-4">
  <div class="column is-three-quarters">
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
      <img src="../img/nospot.jpg">
      </figure>
    </div>
    <div class="card-content">
  </div>
  </div>
  </div>
  </div>`
}
export const noWorkingView = () => {
    return `<div class="card-content">
    <div class="columns is-mobile is-centered">
      <div class="content">
      <div class="card-image">
      <figure class="image is-4by3">
      <img src="../img/sorryDooku.gif">
      </figure>
    </div>
    <div class="card-content">
    <div class="content has-text-centered is-size-4">
    <p>An error has occurred please try again later</p>
    </div>     
     </div>
   </div>
  </div>`
}

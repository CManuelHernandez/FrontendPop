export const spotView = (spot) => {
  let deleteButtonHTML = '';
  if (spot.canBeDeleted) {
    deleteButtonHTML = '<button class="button is-fullwidth">BORRAR</button>';
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


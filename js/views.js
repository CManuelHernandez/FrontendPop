export const spotView = (spot) => {
    return `  
    <div class="ad-data">
    <div class="ad-image">
     <img src="https://bulma.io/images/placeholders/640x480.png" alt="Placeholder image">
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
        <p><p>${spot.price}</p> €</p>
      </div>
        <div class="ad-tags">
       <p>tags</p>
       </div>
    </div>

        </div>
        `;
  };

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


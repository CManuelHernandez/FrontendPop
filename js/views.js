export const spotView = (spot) => {
    return `  
    <div class="ad-data">
    <div class="ad-image">
     <img src="https://bulma.io/images/placeholders/640x480.png" alt="Placeholder image">
    </div>
     <div class="ad-info">
       <div class="ad-main-info">
        <p>${spot.message}</p>
      </div>
      <div class="ad-state">
         <p>Compra o venta</p>
         </div>
         <div class=ad-decription>
           <p>"Lorem ipsum dolor sit amet, 
             consectetur adipiscing elit, 
             sed do eiusmod tempor incididunt 
             ut labore et dolore magna aliqua. 
             Ut enim ad minim veniam, quis 
             nostrud exercitation ullamco 
             laboris nisi ut aliquip ex ea 
             commodo consequat.</p>
         </div>
      <div class="ad-price">
        <p>Precio €</p>
      </div>
        <div class="ad-tags">
       <p>tags</p>
       </div>
    </div>

        </div>
        `;
  };

  export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
      <div class="message-header">
        <p>Error</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        ${errorMessage}
      </div>
    </article>`
  }


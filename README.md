# Swipe assignment: Invoice Creation form
### Live link: https://swipe-smoky.vercel.app/

### Videos
- #### Demo: https://drive.google.com/file/d/12rnpGPT6K4xRt0TcVQRYOzLzg8cZlZJ1/view?usp=sharing
- #### Responsiveness: https://drive.google.com/file/d/1-2-7A0XVXwvjLo7BOTloFRnOBlgBd4f_/view?usp=sharing

## Functionality
- ### Invoice Form
    - Can create a new invoice form
    - Added proper validation checks and showed them using react-hot-toast
    - Can add a new product or select from existing products from the **suggestion dropdown** menu. 
       - If an existing product is selected, then its name, desc, and price will be **autofilled** in the form, and now you just have to fill the quantity (as many invoices can have the same product but different quantities)
       - If adding a whole new product, then it will be added to the product store as well.
    - Can change the currency for that invoice, and all the amounts will be recalculated in the new currency. This data will be consistent across the application for that particular product.
    - Can edit the added product in the invoice form, and that product will be updated in the global products tab as well as in all previous invoices where it was used.

- ### Products tab
    - All the products added in all invoices will be displayed here.
    - The details of a product like name, description, and price are stored only and only here. The invoice only stores the productIds and quantity, and the rest of the details are fetched from the products tab. Thus this acts as the **single source of truth** for product details and provides **consistency in the data across the application**.
    - Can edit the product details like name, desc, and price from here as well, and that will be reflected in all the associated invoices with the correct currency as well - hurray 🥳.
    - It stores all the prices in USD only. 
      - Whenever we need to show product details in an invoice, we first fetch the product details from here then convert prices from USD to the invoice's currency and then render it. 
      - And whenever we edit the product from the invoice, we convert the price from the invoice's currency to USD before updating it in the products tab. **Thus correctness is achieved**.

- ### Invoice modal
    - Moved it to App.js file and integrated it with the redux store so it's accessible from anywhere in the application. Now we just need to dispatch an action to set isOpen: true. No need to call InvoiceModal every time we need it. 🤝
    - It fetches details from the store, so data is always correct and consistent.

## Folder structure
  - ### Redux folder
    - Contains individual states:
      - productsSlice
      - invoiceSlice
      - invoiceModalSlice
      - currencyExchangeSlice
    - Contains hooks to conveniently fetch store data. (We could make a separate folder for hooks and separate files for each slice to maintain better code structuring and modularity)
  - ### Data folder
    - Contains Static data that would otherwise clutter the React components.
    - Maintains less cluttered code in the component and DRY principal.
  - ### Util folder
    - Contains utility functions that are required at multiple places.
      - currencyExchange
      - calculateTotal
      - validateData
  - ### Pages folder
    - Contains level components for individual pages, these are used in routing
  - ### Ui folder
    - Contains those react components that doesn't interact with the store and are required multiple times. (Modularity)
  - ### Components folder
    - Those react components that interact with the redux store.

Looking forward for your feedback ✌️

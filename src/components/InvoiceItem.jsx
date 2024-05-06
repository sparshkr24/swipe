import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Table from "react-bootstrap/Table";

import { addProduct } from "../redux/productsSlice";
import { currencyExchange } from "../utils/currencyExchange";
import { currencySymbolMapping } from "../data/constants";
import { itemStructure } from "../data/products";
import { useCurrencyExchangeData, useProductListData } from "../redux/hooks";
import EditableField from "./EditableField";
import InvoiceItemRow from "../ui/InvoiceItemRow";

const InvoiceItem = ({ allItems, setAllItems, currency, invoiceId }) => {
  const dispatch = useDispatch()
  const { exchangeRate } = useCurrencyExchangeData()
  const { productList, lastProductId } = useProductListData()
  const [currentItem, setCurrentItem] = useState(itemStructure)
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = useCallback(() => {
    const newProductId = lastProductId + 1
    let newItem = currentItem
  
    if (!currentItem.id) {
      newItem = { ...currentItem, id: newProductId }
    }

    let afterConversion = newItem
    if (exchangeRate) {
        afterConversion = currencyExchange({ 
        fromCurrency: exchangeRate[currencySymbolMapping[currency]], 
        toCurrency: 1, 
        data: newItem 
      })
    }
    dispatch(addProduct({ newProduct: afterConversion, invoiceId }));
    setAllItems((prev) => {
      return [
        ...prev,
        newItem
      ];
    });

    setCurrentItem(itemStructure);
  }, [dispatch, currentItem, setAllItems, lastProductId, invoiceId, currency, exchangeRate]);
  
  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setCurrentItem((prev) => {
      return {...prev, [name]: value}
    })

    if (name === "name") {
      const filteredSuggestions = productList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  }, [productList])

  const handleSuggestionClick = useCallback((item) => {
    setCurrentItem(item);
    setShowSuggestions(false);
  },[setCurrentItem]);

  useEffect(()=>{
    if (!currentItem.name) {
      setShowSuggestions(false)
    }
  }, [currentItem])

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <ItemFormRow
            item={currentItem}
            currency={currency}
            handleSubmit={handleSubmit}
            onChange={onChange}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            handleSuggestionClick={handleSuggestionClick}
          />
          {allItems.map((item)=>{
            return (
              <InvoiceItemRow 
                key={item.id} 
                item={item} 
                currency={currency}
                allItems={allItems}
                setAllItems={setAllItems}
                invoiceId={invoiceId}
              />
            )
          })}
        </tbody>
      </Table>
    </div>
  );
};

const ItemFormRow = (props) => {
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={props.onChange}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: props.item.name,
          }}
        />
        {<Dropdown.Menu show={props.showSuggestions && props.suggestions.length}>
          {props.suggestions.map((item) => (
            <Dropdown.Item
              key={item.id}
              eventKey={item.id}
              onClick={() => props.handleSuggestionClick(item)}
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>}
        <EditableField
          onItemizedItemEdit={props.onChange}
          cellData={{
            type: "text",
            name: "desc",
            placeholder: "Item description",
            value: props.item.desc,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={props.onChange}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: props.item.quantity,
          }}
        />
      </td>
      <td style={{ minWidth: "115px" }}>
        <EditableField
          onItemizedItemEdit={props.onChange}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            placeholder: "Price",
            value: props.item.price,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <FaPlus
          onClick={props.handleSubmit}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-primary"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;

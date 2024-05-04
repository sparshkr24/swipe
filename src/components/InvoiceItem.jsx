import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Table from "react-bootstrap/Table";
import { FaPlus } from "react-icons/fa";

import { addProduct } from "../redux/productsSlice";
import { itemStructure } from "../data/products";
import { useProductListData } from "../redux/hooks";
import EditableField from "./EditableField";
import InvoiceItemRow from "../ui/InvoiceItemRow";

const InvoiceItem = ({ allItems, setAllItems, currency, invoiceId }) => {
  const dispatch = useDispatch()
  const { lastProductId } = useProductListData()
  const [currentItem, setCurrentItem] = useState(itemStructure)

  const handleSubmit = useCallback(() => {
    // Setting proper Id for this product
    setCurrentItem((prev) => {
      return { ...prev, id: lastProductId + 1 };
    });
  }, [lastProductId]);

  useEffect(() => {
    if (currentItem.id) {
      // Adding the product to the Product store
      dispatch(addProduct({ newProduct: currentItem }));

      setAllItems((prev) => {
        return [
          ...prev,
          currentItem
        ];
      });

      setCurrentItem(itemStructure);
    }
  }, [dispatch, currentItem, lastProductId, setAllItems, allItems]);
  
  const onChange = useCallback((e)=>{
    setCurrentItem((prev)=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }, [])

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
          />
          {allItems.map((product)=>{
            return (
              <InvoiceItemRow 
                key={product.id} 
                product={product} 
                currency={currency}
                allItems={allItems}
                setAllItems={setAllItems}
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

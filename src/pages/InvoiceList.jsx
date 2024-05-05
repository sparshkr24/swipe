import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Button, ButtonGroup, Card, Col, Container, Row, Table } from "react-bootstrap";

import { deleteInvoice } from "../redux/invoicesSlice";
import { openInvoiceModal } from "../redux/invoiceModalSlice";
import { useInvoiceListData } from "../redux/hooks";
import CreateInvoiceButton from "../ui/CreateInvoiceButton";

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const navigate = useNavigate();
  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      alert("Please enter the valid invoice id.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <Row>
          <Col className="mx-auto" xs={12} md={8} lg={9}>
            <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
            <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
              {isListEmpty ? (
                <div className="d-flex flex-column align-items-center">
                  <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
                  <Link to="/create">
                    <Button variant="primary">Create Invoice</Button>
                  </Link>
                </div>
              ) : (
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                    <div className="d-flex flex-row align-items-center gap-3">
                      <h3 className="fw-bold">Invoice List</h3>
                      <CreateInvoiceButton />
                    </div>

                    <div className="d-flex gap-2">
                      <Link to="/products">
                        <Button variant="primary">
                          Products
                        </Button>
                      </Link>
                      <Button variant="dark" onClick={handleCopyClick}>
                        Copy Invoice
                      </Button>

                      <input
                        type="text"
                        value={copyId}
                        onChange={(e) => setCopyId(e.target.value)}
                        placeholder="Enter Invoice ID to copy"
                        className="bg-white border"
                      />
                    </div>
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>Invoice No.</th>
                        <th>Bill To</th>
                        <th>Due Date</th>
                        <th>Total Amt.</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceList.map((invoice) => (
                        <InvoiceRow
                          key={invoice.id}
                          invoice={invoice}
                          navigate={navigate}
                        />
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Col>
        </Row>
        </Container>
    </div>
  );
};

const InvoiceRow = ({ invoice, navigate }) => {
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    dispatch(openInvoiceModal({ invoice }))
  }, [dispatch, invoice]);

  const handleDeleteClick = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const handleEditClick = () => {
    navigate(`/edit/${invoice.id}`);
  };

  return (
    <>
      <tr>
        <td>{invoice.invoiceNumber}</td>
        <td className="fw-normal">{invoice.billTo}</td>
        <td className="fw-normal">{invoice.dateOfIssue}</td>
        <td className="fw-normal">
          {invoice.currency}
          {invoice.total}
        </td>
        <td style={{ width: "5%" }}>
          <ButtonGroup>
            <Button variant="outline-primary" onClick={handleEditClick}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <BiSolidPencil />
              </div>
            </Button>
            <Button variant="danger" onClick={() => handleDeleteClick(invoice.id)}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <BiTrash />
              </div>
            </Button>
            <Button variant="secondary" onClick={openModal}>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <BsEyeFill />
              </div>
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    </>
  );
};

export default InvoiceList;

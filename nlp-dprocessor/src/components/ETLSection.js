import React from 'react';
import { useTable, useSortBy  } from 'react-table';
import { Row, Col, Button, Card, Form, InputGroup, FormControl, Table } from 'react-bootstrap';
import * as api from '../api/api'; // Import the API functions

const ETLSection = ({ data, handleProcessData, handleRevert, handleTextAreaFocus }) => {

  const formatDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}_${month}_${day}`;
  };
  
  const handleDownloadCSV = async () => {
    const csvData = await api.getCSV();
    const url = URL.createObjectURL(csvData);
    const date = formatDate();
    const link = document.createElement('a');
    link.href = url;
    link.download = `data-${date}.csv`
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  const handleDownloadCode = async () => {
    const codeData = await api.getCode();
    const url = URL.createObjectURL(codeData);
    const date = formatDate();
    const link = document.createElement('a');
    link.href = url;
    link.download = `code-${date}.py`
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const columns = React.useMemo(() => {
    if (data && data.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        Header: () => (
          <>
            <div>{key}</div>
            <div style={{ fontSize: '12px', color: '#999999' }}>
              {typeof data[0][key] === 'number' ? 'number' : 'string'}
            </div>
          </>
        ),
        accessor: key,
      }));
    }
    return [];
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);
  

  return (
    <Row>
      <Col>
        <Card style={{ backgroundColor: '#333333'}}
        onFocus={handleTextAreaFocus}>
          <Card.Header>
            <Row>
              <Col xs={12} md={3}>
                <h2>ETL</h2>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    onClick={handleDownloadCSV}
                    className="button-spacing"
                  >
                    Download CSV
                  </Button>
                  <Button
                    variant="info"
                    onClick={handleDownloadCode}
                    className="button-spacing"
                  >
                    Download Code
                  </Button>
                  <Button variant="danger" 
                    onClick={handleRevert}
                    className="mr-2">
                    Revert
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleProcessData}>
              <InputGroup>
                <FormControl
                  placeholder="Enter ETL instruction. Example: Add a new column called rownum which is the row number."
                  name="instruction"
                  as="textarea"
                  rows={5}
                />
                <Button 
                  type="submit" 
                  variant="primary">
                  Process Data
                </Button>
              </InputGroup>
            </Form>
            <div className="table-container">
            <Table striped bordered hover size="sm" {...getTableProps()} style={{ minWidth: '100%' }}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? '🔽'
                                : '🔼'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="table-row" tabIndex={0}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ETLSection;

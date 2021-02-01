import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTable, useExpanded } from 'react-table'
import { Agreement, Customer, Service } from '../../common/api-types';
import { friendlyAgreementType, friendlyServiceType } from '../utils';
import { flatten, sumBy, sum } from 'lodash';
import { useEditServiceFee } from '../hooks/api';
const  EditableLabel = require('react-inline-editing').default;

interface Props {
  data: Customer[];
  onEdit: () => void;
}

export function CustomersTable(props: Props) {
  const columns = React.useMemo(
    () => [
      {
        // Build our expander column
        id: 'dummy', // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
          <span {...getToggleAllRowsExpandedProps()} />
        ),
        Cell: ({ row }: any) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: { paddingLeft: `${row.depth * 1.5}rem` },
              })}
            >
              {row.isExpanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </span>
          ) : null,
      },
      {
        Header: 'Customer',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'SSN',
            accessor: 'identificationNumber',
          },
        ],
      },
      {
        Header: 'Agreement',
        columns: [
          {
            Header: 'Type',
            accessor: 'agreementType',
          },
          {
            Header: 'Start',
            accessor: 'start',
          },
          {
            Header: 'End',
            accessor: 'end',
          },
        ],
      },
      {
        Header: 'Service',
        columns: [
          {
            Header: 'Service type',
            accessor: 'serviceType',
          },
          {
            Header: 'Price, €',
            accessor: 'fee',
            Cell: ({ row }: any) => {
              const serviceId = row.original.serviceId as number | undefined;
              const [response, putData] = useEditServiceFee(serviceId);
              useEffect(() => {
                if (response.data && props.onEdit) {
                  props.onEdit();
                }
              }, [response]);
              return (
                <span>
                  {serviceId
                   ? <EditableLabel text={`${row.values.fee}`}
                      inputWidth='90px'
                      inputHeight='25px'
                      labelFontWeight='bold'
                      inputFontWeight='bold'
                      onFocusOut={(text: string) => {
                        const num = parseInt(text, 10);
                        if (!num || num === row.values.fee) {
                          return;
                        }
                        putData({data: {id: serviceId, fee: num}})
                      }}
                    />
                  : <b>{row.values.fee}</b>
                  }
                </span>
              );
            },
          },
        ],
      },
    ],
    []
  )
  const rows = props.data.map(d => customerToRow(d));
  return (
    <Styles>
      <div>
        <InnerTable columns={columns} data={rows} />
      </div>
    </Styles>
  )
}

function InnerTable({ columns: userColumns, data }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded // Use the useExpanded plugin hook
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead style={{minWidth: 500}}>
          {headerGroups.map(headerGroup => (
            <tr style={{minWidth: 500}} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  const style =  {
                    minWidth: cell.column.id === 'dummy' ? 50: 100,
                    borderTop:
                      row.values.name
                        ? '1.5px solid black'
                        : row.values.agreementType
                        ? '0.5px solid #d4d4d4'
                        : '0px'};
                  return <td {...cell.getCellProps()} style={style}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
    </>
  )
}

const Styles = styled.div`
  padding: 1rem;
  
  table {
    border-spacing: 0;
    border: 1px solid black;
    text-align: left;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function customerToRow(customer: Customer) {
  const fee = sum(flatten(customer.agreements.map(a => a.services.map( s => +s.fee))));
  return {
    ...customer,
    fee,
    subRows: customer.agreements.map(a => agreementToRow(a)),
  };
}

function agreementToRow(agreement: Agreement) {
  const hasManyServices = agreement.services.length > 1;
  const subRows = hasManyServices
    ? agreement.services.map(service => serviceToRow(service))
    : undefined;
  const serviceType = hasManyServices
    ? 'Multiple'
    : friendlyServiceType(agreement.services?.[0]?.type);
  const fee = sumBy(agreement.services, service => +service.fee);
  const serviceId = hasManyServices ? undefined : agreement.services?.[0]?.id;
  return {
    ...agreement,
    start: new Date(agreement.start).toLocaleDateString('fi-FI'),
    end: agreement.end ? new Date(agreement.end).toLocaleDateString('fi-FI') : undefined,
    agreementType: friendlyAgreementType(agreement.type),
    serviceType,
    serviceId,
    fee,
    subRows,
  };
}

function serviceToRow(service: Service) {
  return {
    ...service,
    serviceId: service.id,
    serviceType: friendlyServiceType(service.type)
  }
}
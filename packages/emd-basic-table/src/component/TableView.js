import { html } from '@stone-payments/lit-element';

const getTableClass = (clickablerows, expandedbody, view) => {
  let result = 'emd-table__wrapper ';
  result += clickablerows ? 'emd-table__wrapper_clickable ' : '';
  result += expandedbody ? 'emd-table__wrapper_expanded ' : '';
  result += view ? `emd-table__wrapper_view_${view} ` : '';
  return result.trim();
};

export const TableView = ({
  rows = [],
  wrappedTitles = [],
  titles = [],
  handleRowClick,
  dispatchCustomEvent,
  getHeaderAdapter,
  getHeaderStyleStrings,
  getRowAdapter,
  getRowStyleStrings,
  clickablerows,
  expandedbody,
  view
}) => html`
  <style>
    @import url("emd-basic-table/src/component/Table.css")
  </style>
  <table class="${getTableClass(clickablerows, expandedbody, view)}">
    ${wrappedTitles.length > 0 ? html`
      <thead class="emd-table__header">
        ${wrappedTitles.map((row, rowIndex) => html`
          <tr class="emd-table__row">
            ${getHeaderAdapter(row, rowIndex)(row, rowIndex, dispatchCustomEvent(rowIndex)).map((cell, cellIndex, cellArray) => html`
              <th
                data-label="${row[cellIndex] || ''}"
                style="${getHeaderStyleStrings(cellArray.length)[cellIndex]}"
                class="emd-table__cell">
                ${cell}
              </th>
            `)}
          </tr>
        `)}
      </thead>
    ` : ''}
    ${rows.length > 0 ? html`
      <tbody class="emd-table__body">
        ${rows.map((row, rowIndex) => html`
          <tr class="emd-table__row">
            ${getRowAdapter(row, rowIndex)(row, rowIndex, dispatchCustomEvent(rowIndex)).map((cell, cellIndex, cellArray) => html`
              <td
                data-label="${titles[cellIndex] || ''}"
                @click="${handleRowClick(rowIndex)}"
                style="${getRowStyleStrings(row, rowIndex, cellArray.length)[cellIndex]}"
                class="emd-table__cell">
                ${cell}
              </td>
            `)}
          </tr>
        `)}
      </tbody>
    ` : ''}
  </table>
`;

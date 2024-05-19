// Table extension, https://github.com/schulle4u/yellow-table

document.addEventListener('DOMContentLoaded', function() {
  const tables = document.querySelectorAll('table[data-tableFunctions="true"]');
  tables.forEach(initTable);

  function initTable(table) {
    const headers = table.querySelectorAll('th');
    const filterInput = document.createElement('input');
    const paginationDiv = document.createElement('div');
    const rowsPerPageAttr = table.getAttribute('data-rowsPerPage');
    const rowsPerPage = rowsPerPageAttr !== null ? parseInt(rowsPerPageAttr, 10) : 10;

    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('aria-label', 'Filter table');
    filterInput.classList.add('table-filter');

    paginationDiv.classList.add('table-pagination');
    paginationDiv.setAttribute('role', 'navigation');
    paginationDiv.setAttribute('aria-label', 'Table Pagination');

    table.parentNode.insertBefore(filterInput, table);
    table.parentNode.insertBefore(paginationDiv, table.nextSibling);

    headers.forEach((header, index) => {
      header.addEventListener('click', () => {
        sortTable(table, index);
        setupPagination(table, rowsPerPage); // Update pagination after sorting
      });
      header.style.cursor = 'pointer';
      header.setAttribute('aria-sort', 'none');
    });

    filterInput.addEventListener('input', () => {
      filterTable(table, filterInput.value);
      setupPagination(table, rowsPerPage); // Update pagination after filtering
    });

    setupPagination(table, rowsPerPage);
  }

  function sortTable(table, colIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const header = table.querySelectorAll('th')[colIndex];
    const isAscending = header.getAttribute('aria-sort') === 'ascending';
    const newSortOrder = isAscending ? 'descending' : 'ascending';

    rows.sort((rowA, rowB) => {
      const cellA = rowA.children[colIndex].innerText.toLowerCase();
      const cellB = rowB.children[colIndex].innerText.toLowerCase();

      if (cellA < cellB) return isAscending ? -1 : 1;
      if (cellA > cellB) return isAscending ? 1 : -1;
      return 0;
    });

    rows.forEach(row => table.querySelector('tbody').appendChild(row));

    table.querySelectorAll('th').forEach(th => th.setAttribute('aria-sort', 'none'));
    header.setAttribute('aria-sort', newSortOrder);
  }

  function filterTable(table, query) {
    const rows = table.querySelectorAll('tbody tr');
    const lowerCaseQuery = query.toLowerCase();

    rows.forEach(row => {
      const cells = Array.from(row.children);
      const matches = cells.some(cell => cell.innerText.toLowerCase().includes(lowerCaseQuery));
      row.style.display = matches ? '' : 'none';
    });
  }

  function setupPagination(table, rowsPerPage) {
    const paginationDiv = table.parentNode.querySelector('.table-pagination');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    let currentPage = 1;

    const visibleRows = rows.filter(row => row.style.display !== 'none');

    paginationDiv.innerHTML = '';

    if (rowsPerPage > 0) {
      const showPage = (pageNum) => {
        const startRow = (pageNum - 1) * rowsPerPage;
        const endRow = startRow + rowsPerPage;

        visibleRows.forEach((row, index) => {
          row.style.display = (index >= startRow && index < endRow) ? '' : 'none';
        });
      };

      const updatePagination = () => {
        paginationDiv.innerHTML = '';

        const totalPages = Math.ceil(visibleRows.length / rowsPerPage);

        const prevButton = document.createElement('button');
        prevButton.innerText = '<<';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePagination();
          }
        });
        paginationDiv.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement('button');
          pageLink.innerText = i;
          pageLink.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
            updatePagination();
          });

          pageLink.setAttribute('aria-label', `Page ${i}`);
          if (i === currentPage) {
            pageLink.setAttribute('aria-current', 'page');
          }

          paginationDiv.appendChild(pageLink);
        }

        const nextButton = document.createElement('button');
        nextButton.innerText = '>>';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
          if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePagination();
          }
        });
        paginationDiv.appendChild(nextButton);

        showPage(currentPage);
      };

      updatePagination();
    } else {
      visibleRows.forEach(row => row.style.display = '');
    }
  }
});

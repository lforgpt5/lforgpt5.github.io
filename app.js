document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, select, label')) return;
      window.location.href = row.dataset.href;
    });
  });

  const lockerCells = document.querySelectorAll('.cell[data-locker]');
  if (!lockerCells.length) return;

  const fields = {
    locker: document.querySelector('[data-field="locker"]'),
    lockStatus: document.querySelector('[data-field="lockStatus"]'),
    size: document.querySelector('[data-field="size"]'),
    contract: document.querySelector('[data-field="contract"]'),
    cellStatus: document.querySelector('[data-field="cellStatus"]'),
    shipment: document.querySelector('[data-field="shipment"]')
  };

  lockerCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      lockerCells.forEach((item) => item.classList.remove('is-selected'));
      cell.classList.add('is-selected');

      const data = cell.dataset;
      if (fields.locker) fields.locker.value = data.locker || '';
      if (fields.lockStatus) fields.lockStatus.value = data.lockStatus || '';
      if (fields.size) fields.size.value = data.size || '';
      if (fields.contract) fields.contract.value = data.contract || '';
      if (fields.cellStatus) fields.cellStatus.value = data.cellStatus || '';
      if (fields.shipment) fields.shipment.value = data.shipment || '';
    });
  });
});

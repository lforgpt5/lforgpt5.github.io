document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, select, label')) return;
      window.location.href = row.dataset.href;
    });
  });

  const searchInput = document.getElementById('deviceSearch');
  const typeFilter = document.getElementById('deviceTypeFilter');
  const statusFilter = document.getElementById('deviceStatusFilter');
  const deviceRows = Array.from(document.querySelectorAll('#deviceTableBody tr'));

  const applyDeviceFilters = () => {
    if (!deviceRows.length) return;
    const query = (searchInput?.value || '').trim().toLowerCase();
    const type = typeFilter?.value || 'all';
    const status = statusFilter?.value || 'all';

    deviceRows.forEach((row) => {
      const haystack = row.dataset.search || '';
      const rowType = row.dataset.type || '';
      const rowStatus = row.dataset.status || '';

      const matchQuery = !query || haystack.includes(query);
      const matchType = type === 'all' || rowType === type;
      const matchStatus = status === 'all' || rowStatus === status;

      row.style.display = matchQuery && matchType && matchStatus ? '' : 'none';
    });
  };

  searchInput?.addEventListener('input', applyDeviceFilters);
  typeFilter?.addEventListener('change', applyDeviceFilters);
  statusFilter?.addEventListener('change', applyDeviceFilters);

  const params = new URLSearchParams(window.location.search);
  const presetFilter = params.get('filter');
  if (presetFilter && statusFilter) {
    if (presetFilter === 'offline') statusFilter.value = 'offline';
    if (presetFilter === 'alerts') statusFilter.value = 'warning';
    if (presetFilter === 'cashlow') {
      searchInput.value = '12%';
    }
    applyDeviceFilters();
  }

  const severityFilter = document.getElementById('eventSeverityFilter');
  const eventItems = document.querySelectorAll('.event-item');
  severityFilter?.addEventListener('change', () => {
    const value = severityFilter.value;
    eventItems.forEach((item) => {
      item.style.display = value === 'all' || item.dataset.severity === value ? '' : 'none';
    });
  });

  const modules = document.querySelectorAll('.module-grid .cell[data-module]');
  const moduleFields = {
    module: document.querySelector('[data-field="module"]'),
    state: document.querySelector('[data-field="state"]'),
    metric: document.querySelector('[data-field="metric"]'),
    last: document.querySelector('[data-field="last"]'),
    action: document.querySelector('[data-field="action"]')
  };

  modules.forEach((module) => {
    module.addEventListener('click', () => {
      modules.forEach((item) => item.classList.remove('is-selected'));
      module.classList.add('is-selected');
      const data = module.dataset;
      if (moduleFields.module) moduleFields.module.value = data.module || '';
      if (moduleFields.state) moduleFields.state.value = data.state || '';
      if (moduleFields.metric) moduleFields.metric.value = data.metric || '';
      if (moduleFields.last) moduleFields.last.value = data.last || '';
      if (moduleFields.action) moduleFields.action.value = data.action || '';
    });
  });

  const ackButton = document.getElementById('ackButton');
  const incidentBadge = document.getElementById('incidentBadge');
  ackButton?.addEventListener('click', () => {
    ackButton.textContent = 'Инцидент подтверждён';
    ackButton.disabled = true;
    if (incidentBadge) {
      incidentBadge.textContent = 'ACK';
      incidentBadge.classList.remove('danger');
      incidentBadge.classList.add('active');
    }
    const target = document.querySelector('.acknowledged-target .muted');
    if (target) {
      target.textContent = 'Инцидент взят в работу оператором. Ожидается проверка канала связи.';
    }
  });

  const pingButton = document.getElementById('pingButton');
  pingButton?.addEventListener('click', () => {
    pingButton.textContent = 'Ping отправлен';
    pingButton.disabled = true;
    setTimeout(() => {
      pingButton.textContent = 'Повторить ping';
      pingButton.disabled = false;
    }, 1800);
  });
});
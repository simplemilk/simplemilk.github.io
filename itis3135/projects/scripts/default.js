  const planType = document.getElementById('planType');
  const tables = document.querySelectorAll('.comparison-table');

  planType.addEventListener(('change'(), () => {
    tables.forEach((table) => {
      table.classList.add('hidden');
    });
    const selected = document.getElementById(planType.value);
    if (selected) selected.classList.remove('hidden');
  }));

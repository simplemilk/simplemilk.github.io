document.addEventListener('DOMContentLoaded', () => {
  const planType = document.getElementById('planType');
  if (planType) {
    planType.addEventListener('change', () => {
      const tables = document.querySelectorAll('.comparison-table');
      tables.forEach((table) => {
        table.classList.add('hidden');
      });
      const selected = document.getElementById(planType.value);
      if (selected) selected.classList.remove('hidden');
    });
  }

  // Checkbox column
  const checkboxes = {
    aetna: document.getElementById('toggle-aetna'),
    bcbs: document.getElementById('toggle-bcbs'),
    cigna: document.getElementById('toggle-cigna')
  };

  // Toggle column
  function toggleColumn(columnName, isChecked) {
    const header = document.getElementById('col-' + columnName);
    const cells = document.querySelectorAll('.col-' + columnName);
    
    if (header) {
      header.classList.toggle('hidden-column', !isChecked);
    }
    
    cells.forEach((cell) => {
      cell.classList.toggle('hidden-column', !isChecked);
    });
  }

  Object.entries(checkboxes).forEach(([company, checkbox]) => {
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        toggleColumn(company, checkbox.checked);
      });
    }
  });
});

// FAQ toggle
function toggleAnswer(answerId) {
  const answer = document.getElementById(answerId);
  answer.classList.toggle('visible');
}
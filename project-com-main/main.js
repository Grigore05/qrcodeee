document.addEventListener('DOMContentLoaded', () => {
  const removeButtons = document.querySelectorAll('.remove-btn');

  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.extension-card');
      if (card) {
        card.remove();
      }
    });
  });
});

function setupFilters() {
  const filters = document.getElementsByClassName('filter');
  const cards = document.getElementsByClassName('extension-card');

  for (let i = 0; i < filters.length; i++) {
    filters[i].onclick = function () {
      for (let j = 0; j < filters.length; j++) {
        filters[j].classList.remove('active');
      }
      this.classList.add('active');

      const filterType = this.getAttribute('data-filter');
      for (let k = 0; k < cards.length; k++) {
        const switchInput = cards[k].querySelector('.switch input');
        if (filterType === 'all')
        {
          cards[k].style.display = 'block';
        }
        else if (filterType === 'active')
        {
          if (switchInput.checked) 
          {
            cards[k].style.display = 'block';
          } 
          else 
          {
            cards[k].style.display = 'none';
          }
        }
         else if (filterType === 'inactive') 
          {
          if (!switchInput.checked)
          {
            cards[k].style.display = 'block';
          } 
          else 
          {
            cards[k].style.display = 'none';
          }
        }
      }
    };
  }
}

window.onload = setupFilters;
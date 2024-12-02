document.addEventListener('DOMContentLoaded', () => {
    const contactList = document.getElementById('contact-list');
    const contactForm = document.getElementById('contact-form');
    const filterInput = document.getElementById('filter');
  
    const fetchContacts = async () => {
      const response = await fetch('/api/contacts');
      const contacts = await response.json();
      contactList.innerHTML = '';
      contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;
        contactList.appendChild(li);
      });
    };
  
    const addContact = async (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
      });
      fetchContacts();
    };
  
    const filterContacts = async () => {
      const query = filterInput.value;
      const response = await fetch(`/api/contacts/filter/${query}`);
      const contacts = await response.json();
      contactList.innerHTML = '';
      contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;
        contactList.appendChild(li);
      });
    };
  
    contactForm.addEventListener('submit', addContact);
    filterInput.addEventListener('input', filterContacts);
  
    fetchContacts();
  });
  
document.addEventListener('DOMContentLoaded', () => {
  const contactList = document.getElementById('contact-list');
  const contactForm = document.getElementById('contact-form');
  const filterInput = document.getElementById('filter');

  const fetchContacts = async () => {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    displayContacts(contacts);
  };

  const displayContacts = (contacts) => {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${contact.name} - ${contact.email} - ${contact.phone}</span>
        <div>
          <button class="edit" onclick="editContact('${contact.id}')">Edit</button>
          <button class="delete" onclick="deleteContact('${contact.id}')">Delete</button>
        </div>
      `;
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

  window.deleteContact = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    fetchContacts();
  };

  window.editContact = async (id) => {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    const phone = prompt("Enter new phone:");
    if (name && email && phone) {
      await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
      });
      fetchContacts();
    }
  };

  const filterContacts = async () => {
    const query = filterInput.value;
    const response = await fetch(`/api/contacts/filter/${query}`);
    const contacts = await response.json();
    displayContacts(contacts);
  };

  contactForm.addEventListener('submit', addContact);
  filterInput.addEventListener('input', filterContacts);

  fetchContacts();
});

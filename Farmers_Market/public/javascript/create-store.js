async function newStoreHandler(event) {
    event.preventDefault();

    const store_name = document.querySelector('input[name="store_name"]').value.trim();
    const store_description = document.querySelector('textarea[name="store_description"]').value;
    const categoryIdsSelect = document.querySelector('select[name="store_categories"]');

    let categoryIds = [];
    let options = categoryIdsSelect && categoryIdsSelect.options

    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        if (opt.selected) {
            categoryIds.push(opt.value);
        }
    }

    console.log(store_name, store_description, categoryIds);

    const response = await fetch(`/api/stores`, {
        method: 'POST',
        body: JSON.stringify({
            store_name,
            store_description,
            categoryIds
        }),
        headers: {
            'Content-Type': 'application/json'

        }
    });
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#add-store-form').addEventListener('submit', newStoreHandler);
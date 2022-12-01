async function newProductHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('input[name="product-name"]').value.trim();
    const product_description = document.querySelector('textarea[name="product-description"]').value;
    const store_id = document.querySelector('select[name="store-for-product"]').value;

    const response = await fetch(`/api/products`, {
        method: 'POST',
        body: JSON.stringify({
            product_name,
            product_description,
            store_id
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

};

document.querySelector('#add-product-form').addEventListener('submit', newProductHandler);
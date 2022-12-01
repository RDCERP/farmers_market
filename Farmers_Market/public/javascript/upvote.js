async function upvoteClickHandler(event) {
    event.preventDefault();

    // TODO: Get the id of the store that belongs to the upvote button being clicked on
    // Try    closest()   to get the id of the store closest to the button??
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];

    const id = event.target.getAttribute('store_id');

    const response = await fetch('/api/stores/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            store_id: parseInt(id)
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('You can only upvote a store once.');
    }

}


document.querySelectorAll('.upvote-btn').forEach((button) => {
    button.addEventListener('click', upvoteClickHandler)
});
// src/services/petService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

// POST - /pets
const create = async (formData) => {
    try {
        console.log("Sending cleaned formData:", formData);

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server Error: ${res.status} - ${errorText}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Error in create function:", err);
        return { err: err.message };
    }
};



// PUT - /pets/:id
const update = async (formData, id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

// DELETE - /pets/:id
const destroy = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};


export {
    index,
    create,
    update,
    destroy,
};

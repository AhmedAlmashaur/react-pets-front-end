// src/components/PetList/PetList.jsx

const PetList = (props) => {
    // src/components/PetList/PetList.jsx

    // src/components/PetList.jsx

    // src/components/PetList/PetList.jsx

    return (
        <div className="sidebar-container">
            <h1>Pet List</h1>
            <div className="list-container">
                {!props.pets.length ? (
                    <h2>No Pets Yet!</h2>
                ) : (
                    <ul>
                        {props.pets.map((pet) =>
                            <li
                                key={pet._id}
                                onClick={() => props.handleSelect(pet)}
                            >
                                {pet.name}
                            </li>
                        )}
                    </ul>
                )}
            </div>
            <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Pet'}
            </button>
        </div>
    );
};

export default PetList;

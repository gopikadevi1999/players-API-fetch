document.addEventListener('DOMContentLoaded', function () {
    const playersContainer = document.getElementById('playersContainer');

    // Fetch players using a Promise
    fetchPlayers()
        .then(players => displayPlayers(players))
        .catch(error => console.error('Error fetching players:', error));

    // Function to fetch players using the fetch API and return a Promise
    function fetchPlayers() {
        return new Promise((resolve, reject) => {
            fetch('https://www.balldontlie.io/api/v1/players')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data.data))
                .catch(error => reject(error));
        });
    }

    // Function to display players on the webpage
    function displayPlayers(players) {
        players.forEach(player => {
            const playerCard = createPlayerCard(player);
            playersContainer.appendChild(playerCard);
        });
    }

    // Function to create a card element for each player
    function createPlayerCard(player) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card', 'shadow');

        const playerName = document.createElement('h5');
        playerName.classList.add('card-title');
        playerName.textContent = player.first_name + ' ' + player.last_name;

        const teamName = document.createElement('p');
        teamName.classList.add('card-text');
        teamName.textContent = 'Team: ' + (player.team ? player.team.full_name : 'N/A');

        const cityName = document.createElement("p");
        cityName.classList.add("cityName");
        cityName.textContent = player.team.city;

        const teamId = document.createElement("p");
        teamId.classList.add("teamId");
        teamId.textContent = player.team.id;

        cardBody.appendChild(playerName);
        cardBody.appendChild(teamName);
        cardBody.appendChild(cityName);
        cardBody.appendChild(teamId);
        card.appendChild(cardBody);

        return card;
    }
});

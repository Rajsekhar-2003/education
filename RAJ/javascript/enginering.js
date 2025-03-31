
        // Data structure for all medical colleges
        const collegeData = {
            
            "West Bengal Engineering Colleges": [
                { "name": "TECHNO INDIA INTERNATIONAL NEW TOWN" },
                { "name": "TECHNO INDIA GROUP" },
                { "name": "TECHNO INDIA UNIVERSITY" },
                { "name": "HERITAGE INSTITUTE OF TECHNOLOGY" },
                { "name": "Meghnad Saha Institute of Technology" },
                { "name": "B. P. Poddar Institute of Management and Technology" },
                { "name": "Guru Nanak Institute of Technology" },
                { "name": "Academy of Technology" },
                { "name": "Haldia Institute of Technology" },
                { "name": "St. Thomas' College of Engineering and Technology" },
                { "name": "Budge Budge Institute of Technology" },
                { "name": "CALCUTTA INSTITUTE OF ENGINEERING AND MANAGEMENT" },
                { "name": "Swami Vivekananda Institute of Science & Technology" },
                { "name": "Future Institute of Engineering and Management" },
                { "name": "Netaji Subhash Engineering College" },
                { "name": "RCC Institute of Information Technology" },
                { "name": "Neotia Institute of Technology, Management and Science" },
                { "name": "Narula Institute of Technology" },
                { "name": "Brainware University" },
                { "name": "MCKV Institute of Engineering" },
                { "name": "Bengal Institute of Technology and Management" },
                { "name": "Hooghly Engineering & Technology College" },
                { "name": "Amity University" },
                { "name": "Adamas University" },
                { "name": "Government College of Engineering And Ceramic Technology" },
                { "name": "NSHM Knowledge Campus" },
                { "name": "Pailan College of Management & Technology (PCMT)" }
              ]
              
       
           
        };

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Create state cards
            const stateGrid = document.getElementById('stateGrid');
            Object.keys(collegeData).forEach(state => {
                const card = document.createElement('div');
                card.className = 'state-card';
                card.textContent = state;
                card.addEventListener('click', () => {
                    // Remove active class from all cards
                    document.querySelectorAll('.state-card').forEach(c => c.classList.remove('active'));
                    // Add active class to clicked card
                    card.classList.add('active');
                    // Display data for selected state
                    displayColleges(state);
                });
                stateGrid.appendChild(card);
            });

            // Set first card as active by default and display its data
            const firstCard = document.querySelector('.state-card');
            if (firstCard) {
                firstCard.classList.add('active');
                displayColleges(firstCard.textContent);
            }

            // Set up search functionality
            document.getElementById('searchButton').addEventListener('click', searchColleges);
            document.getElementById('searchInput').addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    searchColleges();
                }
            });
        });

        // Display colleges for a selected state
        function displayColleges(state) {
            const colleges = collegeData[state];
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            
            colleges.forEach(college => {
                const row = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.textContent = college.name;
                row.appendChild(nameCell);
                
                
                
                tableBody.appendChild(row);
            });
            
            // Show the table and hide no results message
            document.getElementById('dataTable').style.display = 'table';
            document.getElementById('noResults').style.display = 'none';
        }

        // Search colleges across all states
        function searchColleges() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            if (!searchTerm) {
                // If search is empty, show the currently selected state's data
                const activeCard = document.querySelector('.state-card.active');
                if (activeCard) {
                    displayColleges(activeCard.textContent);
                }
                return;
            }
            
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            
            let foundResults = false;
            
            // Search through all states
            Object.keys(collegeData).forEach(state => {
                collegeData[state].forEach(college => {
                    if (college.name.toLowerCase().includes(searchTerm)) {
                        const row = document.createElement('tr');
                        
                        const nameCell = document.createElement('td');
                        nameCell.textContent = college.name;
                        row.appendChild(nameCell);
                        
                        
                       
                        
                        tableBody.appendChild(row);
                        foundResults = true;
                    }
                });
            });
            
            if (foundResults) {
                document.getElementById('dataTable').style.display = 'table';
                document.getElementById('noResults').style.display = 'none';
            } else {
                document.getElementById('dataTable').style.display = 'none';
                document.getElementById('noResults').style.display = 'block';
            }
        }
    
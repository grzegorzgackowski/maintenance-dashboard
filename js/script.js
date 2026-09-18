let issues = JSON.parse(localStorage.getItem("issues")) || [
    {
        id: 1,
        apartment: "Málaga Center 01",
        category: "Plumbing",
        description: "The bathroom sink is leaking",
        date: "2026-09-15",
        priority: "High",
        status: "Pending"
    },
    {
        id: 2,
        apartment: "Málaga Beach 02",
        category: "Internet",
        description: "Wi-Fi connection is not working",
        date: "2026-09-14",
        priority: "Medium",
        status: "In Progress"
    },
    {
        id: 3,
        apartment: "Marbella Apartment 03",
        category: "Cleaning",
        description: "Deep cleaning required after guest checkout",
        date: "2026-09-13",
        priority: "Low",
        status: "Resolved"
    }
];

const issuesList = document.querySelector(".issues-list");

function renderIssues(issuesToRender = issues) {
    issuesList.innerHTML = "";

    issuesToRender.forEach(issue => {

        let statusButton = "";

        if (issue.status !== "Resolved") {
            let buttonText = "";

            if (issue.status === "Pending") {
                buttonText = "Start Progress";
            } else if (issue.status === "In Progress") {
                buttonText = "Resolve";
            }

            statusButton = `
                <button class="status-btn" data-id="${issue.id}">
                    ${buttonText}
                </button>
            `;
        }

        const issueCard = document.createElement("article");

        issueCard.classList.add("issue-card");

        issueCard.innerHTML = `
            <div class="issue-main">

                <div class="issue-info">
                    <h3>${issue.apartment}</h3>

                    <span class="category">
                        ${issue.category}
                    </span>

                    <p>
                        ${issue.description}
                    </p>

                    <span class="issue-date">
                        ${issue.date}
                    </span>
                </div>

                <div class="issue-meta">

                    <span class="priority ${issue.priority.toLowerCase()}">
                        ${issue.priority}
                    </span>

                    <span class="status ${issue.status.toLowerCase().replace(" ", "-")}">
                        ${issue.status}
                    </span>

                    ${statusButton}

                </div>

            </div>
        `;

        issuesList.appendChild(issueCard);
    });
}

renderIssues();

issuesList.addEventListener("click", function (event) {

    if (event.target.classList.contains("status-btn")) {

        const issueId = Number(event.target.dataset.id);

        const issue = issues.find(function (issue) {
            return issue.id === issueId;
        });

        if (issue.status === "Pending") {
            issue.status = "In Progress";
        } else if (issue.status === "In Progress") {
            issue.status = "Resolved";
        }

        localStorage.setItem("issues", JSON.stringify(issues));

        renderIssues();
        updateStatistics();
    }

});

function updateStatistics() {
    const totalIssues = document.querySelector("#total-issues");
    const pendingIssues = document.querySelector("#pending-issues");
    const inProgressIssues = document.querySelector("#in-progress-issues");
    const resolvedIssues = document.querySelector("#resolved-issues");

    totalIssues.textContent = issues.length;

    pendingIssues.textContent = issues.filter(issue => issue.status === "Pending").length;

    inProgressIssues.textContent = issues.filter(issue => issue.status === "In Progress").length;

    resolvedIssues.textContent = issues.filter(issue => issue.status === "Resolved").length;
}

updateStatistics();

const issueForm = document.querySelector("#issue-form");
const apartmentFilter = document.querySelector("#apartment-filter");
const statusFilter = document.querySelector("#status-filter");
const priorityFilter = document.querySelector("#priority-filter");

function filterIssues() {
    const selectedApartment = apartmentFilter.value;
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;

    const filteredIssues = issues.filter(function(issue) {

        if (selectedApartment !== "" && issue.apartment !== selectedApartment) {
            return false;
        }

        if (selectedStatus !== "" && issue.status !== selectedStatus) {
            return false;
        }

        if (selectedPriority !== "" && issue.priority !== selectedPriority) {
            return false;
        }

        return true;
    });

    renderIssues(filteredIssues);
}

issueForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const apartment = document.querySelector("#apartment").value;
    const category = document.querySelector("#category").value;
    const description = document.querySelector("#description").value;
    const date = document.querySelector("#date").value;
    const priority = document.querySelector("#priority").value;

    const newIssue = {
        id: Date.now(),
        apartment: apartment,
        category: category,
        description: description,
        date: date,
        priority: priority,
        status: "Pending"
    };

    issues.push(newIssue);

    localStorage.setItem("issues", JSON.stringify(issues));

    renderIssues();
    updateStatistics();

    issueForm.reset();
});

apartmentFilter.addEventListener("change", filterIssues);
statusFilter.addEventListener("change", filterIssues);
priorityFilter.addEventListener("change", filterIssues);

function populateApartmentFilter() {
    const apartments = [];

    issues.forEach(function(issue) {
        if (!apartments.includes(issue.apartment)) {
            apartments.push(issue.apartment);
        }
    });

    apartments.forEach(function(apartment) {
        const option = document.createElement("option");

        option.value = apartment;
        option.textContent = apartment;

        apartmentFilter.appendChild(option);
    });
}

populateApartmentFilter();
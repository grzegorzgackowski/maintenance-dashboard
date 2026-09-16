const issues = [
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

function renderIssues() {
    issuesList.innerHTML = "";

    issues.forEach(issue => {
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

                </div>

            </div>
        `;

        issuesList.appendChild(issueCard);
    });
}

renderIssues();

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
    renderIssues();
updateStatistics();
issueForm.reset();
});
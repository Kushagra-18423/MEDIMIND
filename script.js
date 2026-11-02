let medicineStatus = {
    1: "Due now",
    2: "Upcoming",
    3: "Upcoming"
};


let lastAction = null;


/* SHOW DIFFERENT SCREENS */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

}


/* TAKE MEDICINE */

function takeMedicine(id) {

    lastAction = {
        id: id,
        previousStatus: medicineStatus[id]
    };

    medicineStatus[id] = "Taken";

    const statusElement =
        document.getElementById("status" + id);

    statusElement.textContent = "Taken";
    statusElement.style.color = "#43b581";

    updateProgress();

}


/* SKIP MEDICINE */

function skipMedicine(id) {

    lastAction = {
        id: id,
        previousStatus: medicineStatus[id]
    };

    medicineStatus[id] = "Skipped";

    const statusElement =
        document.getElementById("status" + id);

    statusElement.textContent = "Skipped";
    statusElement.style.color = "#ff6b6b";

    updateProgress();

}


/* UNDO LAST ACTION */

function undoLast() {

    if (lastAction === null) {

        alert("There is no action to undo.");

        return;
    }

    medicineStatus[lastAction.id] =
        lastAction.previousStatus;

    const statusElement =
        document.getElementById(
            "status" + lastAction.id
        );

    statusElement.textContent =
        lastAction.previousStatus;

    statusElement.style.color = "#e54b6a";

    lastAction = null;

    updateProgress();

}


/* UPDATE PROGRESS */

function updateProgress() {

    let taken = 0;

    for (let id in medicineStatus) {

        if (medicineStatus[id] === "Taken") {

            taken++;

        }

    }

    const total = 3;

    const percentage =
        Math.round((taken / total) * 100);

    document.getElementById("progressText")
        .textContent = percentage + "%";

    document.getElementById("doseCount")
        .textContent =
        taken + " of " + total + " doses taken";

}


/* ADD MEDICINE */

function addMedicine() {

    const name =
        document.getElementById("medicineName").value;

    const dose =
        document.getElementById("medicineDose").value;

    const time =
        document.getElementById("medicineTime").value;

    const food =
        document.getElementById("foodTiming").value;


    if (name === "" || dose === "" || time === "") {

        document.getElementById("addMessage")
            .textContent =
            "Please fill all the details.";

        return;

    }


    let medicines =
        JSON.parse(localStorage.getItem("medicines"))
        || [];


    medicines.push({
        name: name,
        dose: dose,
        time: time,
        food: food
    });


    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    document.getElementById("addMessage")
        .textContent =
        "Medicine added successfully! ✓";


    document.getElementById("medicineName").value = "";
    document.getElementById("medicineDose").value = "";
    document.getElementById("medicineTime").value = "";

}


/* DISPLAY SAVED MEDICINES */

function displaySavedMedicines() {

    const list =
        document.getElementById("savedMedicineList");


    let medicines =
        JSON.parse(localStorage.getItem("medicines"))
        || [];


    if (medicines.length === 0) {

        list.innerHTML =
            "<p class='empty-message'>No medicines added yet.</p>";

        return;

    }


    list.innerHTML = "";


    medicines.forEach(function(medicine) {

        const card =
            document.createElement("div");

        card.className = "saved-med-card";


        card.innerHTML =
            "<h3>💊 " + medicine.name + "</h3>" +
            "<p><strong>Dose:</strong> " +
            medicine.dose + "</p>" +
            "<p><strong>Time:</strong> " +
            medicine.time + "</p>" +
            "<p><strong>Food:</strong> " +
            medicine.food + "</p>";


        list.appendChild(card);

    });

}


/* QUICK AI QUESTIONS */

function quickQuestion(type) {

    let answer = "";


    if (type === "missed") {

        answer =
            "For a missed dose, check the medicine instructions or contact a doctor or pharmacist. Do not take an extra dose without professional advice.";

    }

    else if (type === "food") {

        answer =
            "Food timing can be different for each medicine. Please follow the instructions given by your doctor or pharmacist.";

    }

    else if (type === "next") {

        answer =
            "Your next scheduled dose is shown in your Today's Doses section.";

    }


    document.getElementById("aiAnswer")
        .textContent = answer;

}


/* ASK AI */

function askAI() {

    const question =
        document.getElementById("aiQuestion")
        .value
        .toLowerCase();


    let answer = "";


    if (question === "") {

        answer =
            "Please type a question first.";

    }

    else if (
        question.includes("miss") ||
        question.includes("dose")
    ) {

        answer =
            "For questions about a missed dose, follow your medicine instructions or ask a doctor or pharmacist. Do not double a dose without professional advice.";

    }

    else if (
        question.includes("food") ||
        question.includes("eat")
    ) {

        answer =
            "Food instructions depend on the medicine. Please check the prescription label or ask a healthcare professional.";

    }

    else {

        answer =
            "MediMind provides general guidance only. For specific medical advice, please consult a doctor or pharmacist.";

    }


    document.getElementById("aiAnswer")
        .textContent = answer;

}